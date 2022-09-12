import { User } from "./entities/user";



declare module "IMicropRequest" {
    
    export interface IMicropRequest {
        locals: {
            session: Partial<User>
        }
    }
}