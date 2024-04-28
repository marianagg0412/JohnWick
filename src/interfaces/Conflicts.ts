import {User} from "./User";

export interface Conflicts{
    usersInvolved: User[],
    solution: string,
}