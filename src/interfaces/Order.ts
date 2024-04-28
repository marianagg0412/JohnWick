import {User} from "./User";

export interface Order{
    createdBy: User,
    adjudicador: User,
    order: string,
    objective: string,
    hasBeenExecuted: boolean,
}