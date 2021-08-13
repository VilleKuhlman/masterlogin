import express, { Request, Response } from "express";
import { AuthController } from "../controllers/auth.controller";

export class AuthRoutes {

    constructor(private controller: AuthController = new AuthController(), private router: any = express.Router()){}

    getAuthRoutes = async () => {

        this.router.post('/register', async (request:Request, response: Response) => {
            await this.controller.register(request, response);
        });

        await this.router.post('/login', async (request:Request, response: Response) => {
            await this.controller.login(request, response);
        });

        return this.router;
    }


    getApiRoutes = async () => {

        this.router.get('/secrets', async (request:Request, response: Response) => {
            await this.controller.secrets(request, response);
        });

        return this.router;
    }

}