import type { TaskItemDto } from "./TaskItemDto";

export interface UserTasksDto {
    username: string;
    tasks: Array<TaskItemDto>;
}