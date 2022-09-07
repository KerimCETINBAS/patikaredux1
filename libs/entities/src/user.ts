import { DocumentType, pre, prop, Ref} from "@typegoose/typegoose";
import {} from "typegoose"
import bcrypt from "bcrypt"
import Note from "./notes";
import { BeAnObject, IObjectWithTypegooseFunction , ReturnModelType } from "@typegoose/typegoose/lib/types";




@pre<User>('save', async function() {
    const hash = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
    this.password = hash
})
    
class User {
    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public password!: string;

    @prop({ required: true })
    public email!: string;

    @prop({ref: () => Note })
    public notes?: Ref<Note>[]

    public static async comparePasswrod(this: ReturnModelType<typeof User>, user: { password: string, email: string, name: string }) {

        const _user = await this.findOne(user).exec();

        if (_user) {

            const isPasswordCorrect = bcrypt.compareSync(user.password, _user.password);
            return isPasswordCorrect;
        }
        
        return false;

    }



}


export default User