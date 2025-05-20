import { Request, Response } from 'express';
import { UserService } from '../../database/user-service';
import { StatusCodes } from 'http-status-codes';
import { decodeToken } from '../../utils/authorize';

const userService = new UserService();

export class GetUserController {
    async getUser(req: Request, res: Response): Promise<any> {
        try {
            const token = req.headers['x-access-token'];
            const decoded = decodeToken(token);
            const user = await userService.getUserById(decoded.id);
            return res.status(StatusCodes.OK).send({
                user: user,
            });
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Erro no servidor!');
        }
    }
}
