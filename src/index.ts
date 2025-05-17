import express, { Request, Response } from 'express'
import userRouter from './routes/user'

const app = express()

app.use(express.json())
app.use(userRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
})

app.listen(3000, () => {
    console.log('Rodando na porta 3000');
})