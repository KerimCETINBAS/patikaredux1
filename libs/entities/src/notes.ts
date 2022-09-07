import { prop, Ref } from "typegoose";
import User from "./user";

class Note {
    @prop({ ref: () => User })
    public user?: Ref<User>;

    @prop()
    public title?: string

    @prop()
    public content?: string
}


export default Note