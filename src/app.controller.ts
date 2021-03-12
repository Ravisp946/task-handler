import { Controller, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AddTaskDto } from './dto/AddTask.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users/fetch')
  async fetchAllUsers() {
    return this.appService.fetchAllUsers();
  }

  @Get('/task/add')
  async addTask(@Body() dto: AddTaskDto) {
    this.appService.addTask(dto);
  }
}
