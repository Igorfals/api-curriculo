import express, { Request, Response } from 'express'
import userRouter from './routes/user'
import curriculumRouter from './routes/curriculum'

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(curriculumRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
})

app.listen(3000, () => {
    console.log('Rodando na porta 3000');
})