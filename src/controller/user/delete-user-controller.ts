import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../../database/user-service';
import { decodeAndVerifyToken } from '../../utils/authorize';


const userService = new UserService();

export class DeleteUserController {
    async deleteUser(req: Request, res: Response): Promise<any> {
        try {
            const id = parseInt(req.params.id);
            if (typeof id !== 'number' || isNaN(id)) {
                return res.status(StatusCodes.BAD_REQUEST).send({ mensagem: "ID inválido!" });
            }
            const verifyTokenID = await decodeAndVerifyToken(req)
            if (verifyTokenID !== id) {
                return res.status(StatusCodes.UNAUTHORIZED).send({
                    message: 'Você não tem permissão para acessar este recurso!'
                })
            }
            await userService.deleteUser(id);
            return res.status(StatusCodes.OK).send({ mensagem: "Usuário deletado com sucesso!" });
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Erro no servidor!');
        }
    }
}