import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { NextFunction } from "connect";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
    sub: string;
}

 export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction){

    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try{
        const {sub: user_id} = verify(token, "2e52bab0484e0d5d404f83e9ec1f3e21") as IPayload;
        
        const userRepository = new UsersRepository();
        const user = await userRepository.findById(user_id);

        if(!user){
            throw new AppError("User does not exists!", 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    }catch{
        throw new AppError("Invalid token", 401);
    }

 }