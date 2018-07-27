export interface Task {
    id?: string;
    desc: string;
    completed: boolean;
    priority: number;
    dueDate?: Date;
    remider?: Date;
    remark?: string;
    createDate: Date;
    ownerId?: string;
    participantIds: string[];
    taskListId: string;
}