import {User} from "./User";

export interface Mission{
    executor: User,
    hasBeenExecuted: boolean,
    description: string,
}