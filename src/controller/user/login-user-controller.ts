import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../../database/user-service';
import { loginSchema } from '../../schema/login';
import { formatErrors } from '../../schema/error';
import { passwordCompare } from '../../utils/bcrypt';
import jwt from 'jsonwebtoken';
dotenv.config();

const userService = new UserService();

export class LoginUserController {
    async loginUser(req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body;
            const validationLogin = loginSchema.safeParse(req.body);
            if (!validationLogin.success) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    erros: formatErrors(validationLogin.error)
                });
            }
            const user = await userService.loginUser(email);
            if (!user) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'E-mail ou senha inválidos' });
            }
            const passwordValid = await passwordCompare(password, user.password);
            if (!passwordValid) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'E-mail ou senha inválidos' });
            }
            const token = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email,
                status_user: user.status_user
            }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
            const userData = {
                id: user.id,
                name: user.name,
                email: user.email,
                status_user: user.status_user
            }
            return res.status(StatusCodes.OK).json({
                message: 'Login realizado com sucesso',
                token,
                user: userData
            });
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro no servidor' });
        }
    }
}
