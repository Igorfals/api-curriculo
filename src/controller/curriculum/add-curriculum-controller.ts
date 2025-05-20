import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { formatErrors } from '../../schema/error';
import { CurriculumService } from '../../database/curriculum-service';
import { CurriculumCreate, curriculumSchemaCreate } from '../../schema/curriculum';
import { decodeToken } from '../../utils/authorize';
import { UserService } from '../../database/user-service';

const curriculumService = new CurriculumService();
const userService = new UserService();

export class AddCurriculumController {
    async setCurriculum(req: Request, res: Response): Promise<any> {
        try {
            const request = req.body;
            const token = req.headers['x-access-token'];
            const decoded = decodeToken(token);
            const validatedCurriculum = curriculumSchemaCreate.safeParse(request);
            if (!validatedCurriculum.success) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    erros: formatErrors(validatedCurriculum.error)
                });
            }
            const curriculumAdd: CurriculumCreate = {
                user_id: decoded.id,
                json_data: JSON.stringify(request.json_data)
            };
            await curriculumService.setCurriculum(curriculumAdd);
            return res.status(StatusCodes.CREATED).json({ mensagem: "Curriculum criado com sucesso!" });
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Erro no servidor!');
        }
    }
}
