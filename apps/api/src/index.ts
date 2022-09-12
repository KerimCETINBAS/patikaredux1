
import { Microp, MicropMiddleware, SetCookie  } from "microp"
import { mongoose  , DocumentType} from "@typegoose/typegoose"
import { comparePassword, createUser, isAuthorized } from "./modules/auth"
import UserModel,{ User } from "./entities/user"
import NoteModel from "./entities/notes"
import Cors from "cors"

try {
    mongoose.connect("mongodb://localhost:27017/note")
} catch (error) {
    console.log(error)
}
const app: Microp = new Microp() 


const corsMiddleWare = new MicropMiddleware(Cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(corsMiddleWare)
/**
 * Login
 * giris bilgileri dogru ise kullanici bilgilerini gonder ve kullanici icin token yarat cerez olarak tut
 */
app.post("/login",comparePassword)

app.post("/logout", [isAuthorized, async request => {

    return {
        cookies: [SetCookie("token", "", {
            MaxAge: 0,
            Path: "/"
        })],
        body: { logout: true }
    }
}])
/**
 * name ve password ile yeni kullanici yarat
 */
app.post("/register", createUser)


app.get("/auth", [isAuthorized, async request => {
    
    const user = request.locals?.session as Partial<DocumentType<User>>

    return {
        body: user
    }
}])

/**
 * giris yapilmissa butun notlari cek
 */
app.get("/", [isAuthorized, async request => {
    const user = request.locals?.session as DocumentType<User> 
    const notes = await UserModel.findById(user._id).populate("notes").catch(e => console.log(e))

    return {
        body: {
            user,
            notes: notes?.notes || []
        }
    }
}])

/**
 *  giris yapilmis ise yeni not yarat
 */
app.post("/note", [isAuthorized, async request => {

    const userId = (request.locals?.session as Partial<DocumentType<User>>)?._id

    const { title, content } = await request.body.json()
    
    if(!title && !content) return { status: 400, body: "body must be contain title and content properties"}
    

    const user = await UserModel.findById(userId) as DocumentType<User>
    const note = await NoteModel.create({ user: userId, title, content })
    user.notes.push(note)
    await user.save()
    return {
        body: {
            user: request.locals?.session as Partial<DocumentType<User>>,
            note: note.toJSON()
        }
    }
}])


/**
 * id ye gore notu guncelle
 */
app.patch("/note/:id", [isAuthorized, async request => {
    const noteId = request.params?.id as string;
    const { title, content } = await request.body.json()
    const userId = (request.locals?.session as Partial<DocumentType<User>>)?._id

    if (!title && !content) return { status: 400, body: "body must be contain title and content properties" }
    
    const note = await NoteModel.findOneAndUpdate({ user: userId, _id: noteId }, { title, content }, {new:true})
    
    if (!note)  return { status: 400, body: "Guncellenecek not bulunamadi" }
        
    return {
        body: {
            user: request.locals?.session as Partial<DocumentType<User>>,
            note: note.toJSON()
        }
    }
}])

/**
 * id ye gore notu sil
 */

app.delete("/note/:id", [isAuthorized, async request => {

    const noteId = request.params?.id as string;
    const note = await NoteModel.findByIdAndDelete({ user: (request.locals?.session as Partial<DocumentType<User>>)?._id, _id: noteId })
    return {
        body: { delete: true}
    }
}])

/*
    id ye gore notu cek
*/
app.get("/note/:id", [isAuthorized, async  request => {
    const noteId = request.params?.id as string;
    const note = await NoteModel.findOne({ user: (request.locals?.session as Partial<DocumentType<User>>)?._id, _id: noteId })
    
    if(!note) return { status: 404 }
    return { 
        body: {
            user: request.locals?.session as Partial<DocumentType<User>>,
            note
        }
    }
}])





app.listen(3001)