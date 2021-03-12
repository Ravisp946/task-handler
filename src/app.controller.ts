import { Controller, Get, Body, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AddTaskDto } from './dto/AddTask.dto';
import { EditTaskDto } from './dto/EditTask.dto';
import { FetchUserTaskDto } from './dto/FetchUserTask.dto';
import { MarkDoneDto } from './dto/MarkDone.dto';
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

  @Post('/task/fetch')
  async fetch(@Body() dto: FetchUserTaskDto) {
    return this.appService.fetchUserTask(dto);
  }

  @Patch('/task/markDone')
  async markDone(@Body() dto: MarkDoneDto) {
    return this.appService.markTaskDone(dto.taskId);
  }
}
