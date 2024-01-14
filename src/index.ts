import express, { type Application } from "express"
import { routes } from "./routes"
import count from "./templates"

const app: Application = express()
const port: number = 4000

routes(app)
count()


app.listen(port, () => console.log(`Server is listening on http://localhost:${port}`))