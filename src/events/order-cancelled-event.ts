import { Subjects } from "./subjects";

export interface OrderCancelledEvent {
    subject: Subjects.OrderCancelled;
    version: number;
    data: {
        id: string;
        ticket: {
            id: string;
        }
    }
}