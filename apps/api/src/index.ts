import { Microp } from "microp"
const app = new Microp()



app.get("/notes", request => {
    return {
        headers: {
            "Content-Type" : "application/json"
        },
        status: 200,
        body: [
            "note1",
            "note2",
            "note3"
        ]
    }
})

app.listen(3300)