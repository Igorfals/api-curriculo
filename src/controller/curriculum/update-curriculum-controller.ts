import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { formatErrors } from '../../schema/error';
import { CurriculumService } from '../../database/curriculum-service';
import { CurriculumID, curriculumSchemaID } from '../../schema/curriculum';
import { decodeToken } from '../../utils/authorize';

const curriculumService = new CurriculumService();

export class UpdateCurriculumController {
    async updateCurriculum(req: Request, res: Response): Promise<any> {
        try {
            const request = req.body;
            const token = req.headers['x-access-token'];
            const decoded = decodeToken(token);
            const curriculumId = await curriculumService.getCurriculumById(request.id);
            const validatedCurriculum = curriculumSchemaID.safeParse(request);
            if (!validatedCurriculum.success) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    erros: formatErrors(validatedCurriculum.error)
                });
            }
            if (decoded.id !== curriculumId.user_id) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    mensagem: "Você não tem permissão para acessar este recurso!"
                });
            }
            const idCurriculum = await curriculumService.getCurriculumById(request.id);
            if (!idCurriculum) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    mensagem: "Curriculum não encontrado!"
                });
            }
            const curriculumUpdate: CurriculumID = {
                id: request.id,
                user_id: decoded.id,
                json_data: JSON.stringify(request.json_data)
            };
            await curriculumService.updateCurriculum(curriculumUpdate);
            return res.status(StatusCodes.CREATED).json({ mensagem: "Curriculum criado com sucesso!" });
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Erro no servidor!');
        }
    }
}
