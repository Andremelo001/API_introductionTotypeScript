import "reflect-metadata";
import  express  from 'express';
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import "./database";

import "./shared/container"

import { router } from './routes';
import  swaggerFile from "./swagger.json";
import { AppError } from "./errors/AppError";
import { Request, Response, NextFunction } from "express";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("server is run"));

