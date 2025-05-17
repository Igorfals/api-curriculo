import bcrypt from 'bcrypt'

export function passwordCompare(senha: string, hash: string): any {
    return bcrypt.compare(senha, hash)
}

export function generatePassword(senha: string): any {
    return bcrypt.hash(senha, 10)
}
