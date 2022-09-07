import { pre, prop, Ref } from "typegoose";

import Note from "./notes";
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});


@pre<User>('save', function() {
    this.isKitten = this.age < 1
})
    
    
class User {
    @prop({ required: true })
    public name?: string;

    @prop({ required: true })
    public password?: string;

    @prop({ required: true })
    public email?: string;

    @prop({ref: () => Note })
    public notes?: Ref<Note>[]





}


export default User