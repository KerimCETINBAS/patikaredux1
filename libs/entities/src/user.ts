
import "reflect-metadata"
import { DocumentType, pre, prop, Ref, getModelForClass, ReturnModelType, PropType } from "@typegoose/typegoose";
import bcrypt from "bcrypt"
import { Note } from "./notes";




// @pre<User>('save', async function() {
//     const hash = await bcrypt.hash(this.password as string, await bcrypt.genSalt(10));
//     this.password = hash
// })
    
class User {
    @prop()
    public name?: string;

    @prop()
    public password?: string;

    @prop()
    public email?: string;
    
    @prop({ ref: ()=>Array<Note>, required: true, default: [] }, PropType.ARRAY)
    public notes?: Ref<Note>[];

    // public static async comparePasswrod(this: ReturnModelType<typeof User>, user: { password: string, email: string, name: string , notes: Note[]}) {

    //     const _user = await this.findOne(user).exec();

    //     if (_user) {

    //         const isPasswordCorrect = bcrypt.compareSync(user.password, _user.password as string);
    //         delete _user.password
    //         return _user;
    //     }
        
    //     return false;

    // }

 

}

const model = getModelForClass(User);

export default model


export { User };
    
    


