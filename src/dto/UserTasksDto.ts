import type { TaskItemDto } from "./taskItemDto";

export interface UserTasksDto {
    username: string;
    tasks: Array<TaskItemDto>;
}