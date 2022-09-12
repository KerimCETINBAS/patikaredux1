
import { DocumentType, pre, prop, Ref, getModelForClass, ReturnModelType, PropType, index } from "@typegoose/typegoose";
import bcrypt from "bcrypt"
import { plugin } from "mongoose";
import { Note } from "./notes";
import unique  = require("mongoose-unique-validator")



// @pre<User>('save', async function() {
//     const hash = await bcrypt.hash(this.password as string, await bcrypt.genSalt(10));
//     this.password = hash
// })

abstract class Base { }
@index({ name: 1 }, { unique: true })
class User {
    @prop({unique: true , type: () => String })
    public name?: string;

    @prop()
    public password?: string;
    
    @prop({ ref: ()=> Note, required: true, default: [] }, PropType.ARRAY)
    public notes!: Ref<Note>[];
}

const model = getModelForClass(User);

export default model


export { User };
     
    


