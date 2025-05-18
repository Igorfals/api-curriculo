import { Response, Request, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
require('dotenv/config')

export function authorize(req: Request, res: Response, next: NextFunction): any {
    const token: any = req.headers['x-access-token']
    if (!token) {
        res.status(401).json({
            mensagem: 'Acesso negado!'
        })
    } else {
        // Verifica se o token é válido e decodifica-o
        jwt.verify(token, process.env.JWT_SECRET, function (error: any, decoded: any) {
            if (error) {
                res.status(401).json({
                    mensagem: 'Token inválido!'
                })
            } else {
                // Acessa o primeiro valor do objeto decodificado
                const firstValue = Object.values(decoded)[0];
                if (!firstValue) {
                    res.status(StatusCodes.NETWORK_AUTHENTICATION_REQUIRED).json({
                        mensagem: 'Você não tem permissão para acessar este recurso!'
                    })
                }
                next()
            }
        })
    }
}

export function decodeToken(data: any): any {
    try {
        return jwt.verify(data, process.env.JWT_SECRET)
    } catch {
        return null
    }
}

export async function decodeAndVerifyToken(req: Request): Promise<any> {
    const token: any = req.headers['x-access-token']
    if (!token) {
        return null
    }
    try {
        // Verifica se o token é válido e decodifica-o
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
        // Acessa o primeiro valor do objeto decodificado
        const firstValue = Object.values(decoded)[0];
        return firstValue || null;
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return null;
    }
}

