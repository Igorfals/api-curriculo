import { Request, Response } from 'express';
import { UserService } from '../../database/user-service';
import { StatusCodes } from 'http-status-codes';

const userService = new UserService();

export class GetUserController {
    async getUser(req: Request, res: Response): Promise<any> {
        try {
            const request = req.body;
            const user = await userService.getAllUsers(request)
            const userTotal = await userService.getAllUSerTotal(request)
            return res.status(StatusCodes.OK).send({
                user: user,
                total: userTotal.total
            });
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Erro no servidor!');
        }
    }
}

export class GetUserByIdController {
    async getUserById(req: Request, res: Response): Promise<any> {
        try {
            const id = parseInt(req.params.id);
            if (typeof id !== 'number' || isNaN(id)) {
                return res.status(StatusCodes.BAD_REQUEST).send({ mensagem: "ID inválido!" });
            }
            const user = await userService.getUserById(id);
            return res.status(StatusCodes.OK).send(user);
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Erro no servidor!');
        }
    }
}