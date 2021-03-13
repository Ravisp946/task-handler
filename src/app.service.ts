/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { Pool } from 'pg'; 
import { AddTaskDto } from './dto/AddTask.dto';
import { FetchUserTaskDto } from './dto/FetchUserTask.dto';
import { PickTaskDto } from './dto/PickTask.dto';
import moment = require('moment');
import { IncomingWebhook, IncomingWebhookSendArguments } from '@slack/webhook';
// import ormconfig from '../ormconfig.json';
const ormconfig = require('../ormconfig.json');
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async fetchAllUsers(){
      const pool = new Pool({
        user: ormconfig.username,
        host: ormconfig.host,
        database: ormconfig.database,
        password: ormconfig.password,
      });
      try {
        const result = await pool.query('Select * from users');
        await pool.end();
        return result.rows;
      } catch(err){
         if(!pool.ended){
           await pool.end();
         }
         throw err;
      }
  }

  async addTask(task: AddTaskDto) {
    const pool = new Pool({
      user: ormconfig.username,
      host: ormconfig.host,
      database: ormconfig.database,
      password: ormconfig.password,
    });
    try {
      await pool.query('insert into task (assignor_id, assignee_id, title, description, jira_id, time_estimate) values ($1, $2, $3, $4, $5, $6)', [task.assignorId, task.assigneeId, task.title, task.description, task.jiraId, task.timeEstimate]);
      await pool.end();
      return { status : 'OK'};
    } catch (err) {
      if (!pool.ended) {
        await pool.end();
      }
      throw err;
    }
  }

  async editTask(taskId, task: AddTaskDto) {
    const pool = new Pool({
      user: ormconfig.username,
      host: ormconfig.host,
      database: ormconfig.database,
      password: ormconfig.password,
    });
    try {
      await pool.query('update task set assignor_id = $1, assignee_id = $2, title = $3, description =$4, jira_id = $5, time_estimate = $6 where id = $7', [task.assignorId, task.assigneeId, task.title, task.description, task.jiraId, task.timeEstimate, taskId]);
      await pool.end();
      return { status : 'OK'};
    } catch (err) {
      if (!pool.ended) {
        await pool.end();
      }
      throw err;
    }
  }

  async fetchUserTask(dto: FetchUserTaskDto) {
      const pool = new Pool({
        user: ormconfig.username,
        host: ormconfig.host,
        database: ormconfig.database,
        password: ormconfig.password,
      });
      try {
        const { userId } = dto;
        let taskObject;
        if(userId){
          taskObject = await pool.query(`Select task.*, users.name from task left join users on users.id = task.assignor_id where id = $1 order by task.id`, [userId]);
        } else {
          taskObject = await pool.query(`Select task.* from task left join users on users.id = task.assignor_id order by task.id`);
        }
        await pool.end();
        const currentDate = new Date();
        const result = {};
        const taskObjectRows = taskObject.rows;
        taskObjectRows.forEach((task) => {
          result[task.assignor_id] = [];
        });

        taskObjectRows.forEach((task) => {
          if(task.starting_time){
            const hours = Math.abs(currentDate.getTime() - task.starting_time.getTime()) / 36e5;
            task.time_elapsed = hours;
          }
          result[task.assignor_id].push(task);
        });
        return result;
      } catch(err){ 
        if(!pool.ended){
          await pool.end();
        }
        throw err;
      }
  }

  async markTaskDone(taskId) {
    const pool = new Pool({
      user: ormconfig.username,
      host: ormconfig.host,
      database: ormconfig.database,
      password: ormconfig.password,
    });
    try {
      await pool.query(`update task set status='DONE' where id = $1`, taskId);
      await pool.end();
      return { status : 'OK'};
    } catch (err) {
      if (!pool.ended) {
        await pool.end();
      }
      throw err;
    }
  }

  async pickTask(dto: PickTaskDto){
    const { id, startingTime } = dto;
    const pool = new Pool({
      user: ormconfig.username,
      host: ormconfig.host,
      database: ormconfig.database,
      password: ormconfig.password,
    });
    try {
      // fire notification event for Task Pick
      const url = 'https://hooks.slack.com/services/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';
      const attachments = [
        {
          color: '#a63646',
          title: 'Task Status Update',
          text: '```' + 'Ravi has started task 1' + '```',
        },
      ];
      await this.sendSlackMessage({ attachments }, url);
      // const start = new Date();
      await pool.query(`update task set status = 'IN PROGRESS', starting_time = $1 where id = $2`, [
        startingTime, Number(id)
      ]);
      const taskObject = await pool.query(`select * from task where id = $1`,[Number(id)]);
      const taskDetails = taskObject.rows[0];
      const currentDate = new Date();
      const estimatedTime = taskDetails.time_estimate;
      const deadLineTime = moment(currentDate).add(estimatedTime, 'hours').toDate();
      const eventFireTimeinMs = Math.abs(deadLineTime.getTime() - startingTime.getTime());
      const userName = 'Nikhil';
      // fire notification event for deadline 
      setTimeout(function(){
        const url = 'https://hooks.slack.com/services/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';
        const attachments = [
          {
            color: '#a63646',
            title: 'Task Status Update',
            text: '```' + `${userName} Your Task Time is about to get over` + '```',
          },
        ];
        const webhook = new IncomingWebhook(url);
        webhook.send({attachments});
      }, eventFireTimeinMs);
      await pool.end();
      return { status : 'OK' };
    } catch(err){
      if(!pool.ended){
        await pool.end();
      }
      throw err;
    }
  }

  async sendSlackMessage(messageObject: string | IncomingWebhookSendArguments, url: string) {
		const webhook = new IncomingWebhook(url);
		return webhook.send(messageObject);
	}

}
