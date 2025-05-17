import { Request, Response } from 'express';
import { UserService } from '../../database/user-service';
import { UserCreate, userSchemaCreate } from '../../schema/user';
import { StatusCodes } from 'http-status-codes';
import { formatErrors } from '../../schema/error';
import { generatePassword } from '../../utils/bcrypt';

const userService = new UserService();

export class AddUserController {
    async setUser(req: Request, res: Response): Promise<any> {
        try {
            const request = req.body;
            const validatedUser = userSchemaCreate.safeParse(request);
            if (!validatedUser.success) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    erros: formatErrors(validatedUser.error)
                });
            }
            const checkUserEmail = await userService.checkUserEmail(request.email);
            if (checkUserEmail) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    mensagem: "E-mail já cadastrado!"
                });
            }
            const hashPassword = await generatePassword(request.password)
            const userAdd: UserCreate = {
                name: request.name,
                email: request.email,
                password: hashPassword,
                status_user: request.status_user
            };
            await userService.setUser(userAdd);
            return res.status(StatusCodes.CREATED).json({ mensagem: "Usuário criado com sucesso!" });
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Erro no servidor!');
        }
    }
}
