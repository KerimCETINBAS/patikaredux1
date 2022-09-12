import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import UserModel, { User } from "./user";

class Note {
    @prop({ ref: () => typeof User , required: true})
    public user?: Ref<User>;

    @prop()
    public title?: string

    @prop()
    public content?: string
}


export default getModelForClass(Note)
export { Note } 