import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task as TaskModel } from './models/task.model';
import { CreateTaskInput } from './dto/createTask.input';
import { UpdateTaskInput } from './dto/updateTask.input';

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) { }

  @Query(() => [TaskModel], {
    nullable: 'items',
    description: 'タスク取得用Query',
  })
  async getTasks(): Promise<TaskModel[]> {
    return await this.taskService.getTasks();
  }

  @Mutation(() => TaskModel, { description: 'タスク作成用Mutation' })
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<TaskModel> {
    return await this.taskService.createTask(createTaskInput);
  }

  @Mutation(() => TaskModel, { description: 'タスク更新用Mutation' })
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Promise<TaskModel> {
    return await this.taskService.updateTask(updateTaskInput);
  }

  @Mutation(() => TaskModel, { description: 'タスク削除用Mutation' })
  async deleteTask(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<TaskModel> {
    return await this.taskService.deleteTask(id);
  }
}
