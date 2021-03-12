/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { Pool } from 'pg'; 
import { AddTaskDto } from './dto/AddTask.dto';
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
        return result;
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
      await pool.query('insert into task (assignor_id, assignee_id, title, description, jira_id, time_estimate) values ($1, $2, $3, $4, $5, $6)', [task.assignorId, task.assigneeId, task.title, task.description, task.jiraID, task.timeEstimate]);
      await pool.end();
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
      await pool.query('update task set assignor_id = $1, assignee_id = $2, title = $3, description =$4, jira_id = $5, time_estimate = $6 where id = $7', [task.assignorId, task.assigneeId, task.title, task.description, task.jiraID, task.timeEstimate, taskId]);
      await pool.end()
    } catch (err) {
      if (!pool.ended) {
        await pool.end();
      }
      throw err;
    }
  }
}
