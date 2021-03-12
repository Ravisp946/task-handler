/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { Pool } from 'pg'; 
import { FetchUserTaskDto } from './dto/FetchUserTask.dto';
// import ormconfig from '../ormconfig.json';
const ormconfig = require('../ormconfig.json');
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async addTask(){
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
          taskObject = await pool.query(`Select task.*, user.name from task left join user on user.id = task.assignorId where id = $1 order by task.id`, [userId]);
        } else {
          taskObject = await pool.query(`Select task.* from task left join user on user.id = task.assignorId order by task.id`);
        }
        await pool.end();
        const result = {};
        const taskObjectRows = taskObject.rows;
        taskObjectRows.forEach((task) => {
          result[task.assignorId] = [];
        });

        taskObjectRows.forEach((task) => {
          result[task.assignorId].push(task);
        });
        return result;
      } catch(err){
        if(!pool.ended){
          await pool.end();
        }
        throw err;
      }
  }
}
