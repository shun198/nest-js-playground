import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task as TaskModel } from './models/task.model';
import { CreateTaskInput } from './dto/createTask.input';

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

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
}
