import { Controller, Get, Body, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AddTaskDto } from './dto/AddTask.dto';
import { EditTaskDto } from './dto/EditTask.dto';
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

  @Post('/task/add')
  async addTask(@Body() dto: AddTaskDto) {
    this.appService.addTask(dto);
  }

  @Patch('/task/edit')
  async editTask(@Body() dto: EditTaskDto) {
    this.appService.editTask(dto.taskId, dto.task);
  }
}
