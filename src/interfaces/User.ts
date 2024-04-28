import {Auth} from "./Auth";

type UserRole = "AltaMesa" | "LiderDeRegion" | "Asesino" | "Adjudicador";
export interface User extends Auth{
    role: UserRole,
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
