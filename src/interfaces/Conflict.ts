import {User} from "./User";

export interface Conflict{
    usersInvolved: User[],
    solution: string,
    status: string
}