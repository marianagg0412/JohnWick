import {Auth} from "./Auth";
import {Sanction} from "./Sanction";

export type UserRole = "AltaMesa" | "LiderDeRegion" | "Asesino" | "Adjudicador";
export interface User extends Auth{
    username: string,
    password: string,
    role: UserRole,
    sanctions?: Sanction[],
    region?: string
}

type LiderDeRegion = User & {
    role: "LiderDeRegion",
    region: string
}

type NotLiderDeRegion = User & {
    role: Exclude<UserRole, "LiderDeRegion">,
    region?: never
}
