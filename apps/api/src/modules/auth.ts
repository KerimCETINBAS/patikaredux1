import Microp, { MicropHandler, SetCookie} from "microp"
import UserModel, { User } from "../entities/user"
import { compare, genSalt, hash } from "bcrypt"
import { DocumentType } from "@typegoose/typegoose"
import jwt, { JwtPayload } from "jsonwebtoken"

export const comparePassword: MicropHandler = async request => {

    const _body = await request.body.json()
    const { name, password } = _body

    const user: Partial<DocumentType<User>> | null = await UserModel.findOne({ name }).lean();
    delete user?.notes;

    if (!user) return { status: 401 }
  
    

    if (!await compare(password as string, user?.password || "")) return { status: 401 }
    delete user?.password;
    delete user?.__v;
    let token = jwt.sign(await user, 'top_secret_key_that_not_on_github');
     
    return {
        cookies: [ SetCookie("token", token, { MaxAge: 60*60*24*7, Path: "/"}) ],
        body: user
    }
    
}


export const createUser: MicropHandler = async request => {

   
    const { name, password} = await request.body.json()
    const hashedPassword = await hashPassword(password as string)
    const user  = await (await UserModel.create({name, password:hashedPassword})).toJSON()
    delete user?.password

    console.log(user)
    return {
        body: user
    }

}



const hashPassword = (password: string): Promise<string> => {
    
    return new Promise((resolve) => {
        const saltRounds = 10
        genSalt(saltRounds, function(err, salt) {
            hash(password as string, salt, function(err, hash) {

                resolve(hash)
            });
        });
    })
} 



export const isAuthorized: MicropHandler = async request => {
    const token = request.cookies.token && request.cookies.token || ""
    try {
        const isValid: Partial<User & { __v: number, iat: number }> = jwt.verify(token || "", 'top_secret_key_that_not_on_github') as Partial<User & { __v: number, iat: number }> 
        delete isValid?.__v
        delete isValid?.iat
        delete isValid?.password
        delete isValid?.notes
        return {
            locals: {
                session: isValid
            }
        }
    } catch {
        return {
            status: 401,
            body: {
                error: "401 unauthorized"
            }
        }
    }
 
}