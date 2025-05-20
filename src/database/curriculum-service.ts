import { Knex } from "knex";
import { CurriculumData, CurriculumID } from "../schema/curriculum";
import { knexconection as knex } from "./knex-conection";

export class CurriculumService {
    getAllCurriculum(request: any): Knex.QueryBuilder<CurriculumData[]> {
        return knex('curriculos').select('*')
    }

    getAllCurriculumTotal(request: any): Knex.QueryBuilder<CurriculumData[]> {
        return knex('curriculos').count('id as total')
    }

    getCurriculumById(id: number): Knex.QueryBuilder<CurriculumID[]> {
        return knex('curriculos').where('id', id).first()
    }

    getUserByIdForCurriculumById(userId: number): Promise<CurriculumID[]> {
        return knex('curriculos').where('user_id', userId).first()
    }

    setCurriculum(obj: any): Knex.QueryBuilder<CurriculumData[]> {
        return knex('curriculos').insert(obj)
    }

    updateCurriculum(obj: any): Knex.QueryBuilder<CurriculumData[]> {
        return knex('curriculos').update(obj).where('id', obj.id)
    }

    deleteCurriculum(id: number): Knex.QueryBuilder {
        return knex('curriculos').where('id', id).del()
    }
}