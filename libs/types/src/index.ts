
import { nanoid } from "nanoid"
export interface notes {
    note: string
}


export class Note {

    private _id:string | undefined
    private _content: string;
    

    constructor(content: string) {
        this._content = content
        this._id = nanoid()
    }
    
    public get content() : string {
        return this._content;
    }
    public setContent(v : string) {
        this._content = v;
        return this._content;
    }

}

export type Notes = Array<Note>


