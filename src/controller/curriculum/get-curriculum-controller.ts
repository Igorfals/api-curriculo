import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { decodeToken } from '../../utils/authorize';
import { CurriculumService } from '../../database/curriculum-service';

const curriculumService = new CurriculumService();

export class GetCurriculumController {
    async getCurriculum(req: Request, res: Response): Promise<any> {
        try {
            const token = req.headers['x-access-token'];
            const decoded = decodeToken(token);
            if (!decoded) {
                return res.status(StatusCodes.UNAUTHORIZED).send({
                    message: 'Você não tem permissão para acessar este recurso!'
                });
            }
            const curriculum: any[] = await curriculumService.getUserByIdForCurriculumById(decoded.id);
            return res.status(StatusCodes.OK).send({
                curriculum: curriculum,
            });
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Erro no servidor!');
        }
    }
}
