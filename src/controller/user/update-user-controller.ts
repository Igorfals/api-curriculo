import { Request, Response } from 'express';
import { UserService } from '../../database/user-service';
import { UserCreate, UserID, userSchemaCreate, userSchemaID } from '../../schema/user';
import { StatusCodes } from 'http-status-codes';
import { formatErrors } from '../../schema/error';
import { generatePassword } from '../../utils/bcrypt';
import { decodeAndVerifyToken } from '../../utils/authorize';

const userService = new UserService();

export class UpdateUserController {
    async updateUser(req: Request, res: Response): Promise<any> {
        try {
            const request = req.body;
            const validatedUser = userSchemaID.safeParse(request);
            if (!validatedUser.success) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    erros: formatErrors(validatedUser.error)
                });
            }
            const userOldID = await userService.getUserById(request.id);
            if (!userOldID) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    mensagem: "Usuário não encontrado!"
                });
            }
            const checkUserEmail = await userService.checkUserEmail(request.email);
            if (checkUserEmail && checkUserEmail.id !== request.id) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    mensagem: "E-mail já cadastrado!"
                });
            }
            const verifyTokenID = await decodeAndVerifyToken(req)
            if (verifyTokenID !== request.id) {
                return res.status(StatusCodes.UNAUTHORIZED).send({
                    message: 'Você não tem permissão para acessar este recurso!'
                })
            }
            const hashPassword = await generatePassword(request.password)
            const userUpdate: UserID = {
                id: request.id,
                name: request.name,
                email: request.email,
                password: hashPassword,
                status_user: request.status_user
            };
            await userService.updateUser(userUpdate);
            return res.status(StatusCodes.OK).json({ mensagem: "Usuário atualizado com sucesso!" });
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Erro no servidor!');
        }
    }
}
