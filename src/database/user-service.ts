import { Knex } from "knex";
import { UserData, UserID } from "../schema/user";
import { knexconection as knex } from "./knex-conection";

export class UserService {
    getAllUsers(request: any): Knex.QueryBuilder<UserData[]> {
        return knex('users').select('*')
    }

    getAllUSerTotal(request: any): Knex.QueryBuilder<UserData[]> {
        return knex('users').count('id as total')
    }

    checkUserEmail(email: string): Knex.QueryBuilder<UserData[]> {
        return knex('users').where('email', email).first()
    }

    getUserById(id: number): Knex.QueryBuilder<UserID[]> {
        return knex('users').where('id', id)
    }

    setUser(obj: any): Knex.QueryBuilder<UserData[]> {
        return knex('users').insert(obj)
    }

    updateUser(obj: any): Knex.QueryBuilder<UserData[]> {
        return knex('users').update(obj).where('id', obj.id)
    }

    deleteUser(id: number): Knex.QueryBuilder {
        return knex('users').where('id', id).del()
    }
}