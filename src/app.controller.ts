/* eslint-disable prettier/prettier */
import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { FetchUserTaskDto } from './dto/FetchUserTask.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/task/add')
  async addTask() {
    return this.appService.addTask();
  }

  @Get('/task/fetch')
  async fetch(@Body() dto: FetchUserTaskDto) {
    return this.appService.fetchUserTask(dto);
  }
}
