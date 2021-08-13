import { Request, Response } from "express";
import passport from "passport";
import { AuthService } from "../../services/auth.service";

export class AuthController {

    constructor(private service: AuthService = new AuthService()){}
    
    register = async (req: Request, res: Response) => {

        const user = await this.service.register(req, res);  
        res.status(!!user ? 200 : 400).json({});

    }

    login = async (req: any, res: any) => {

        const token = await this.service.getToken(req, res);
        if( !!token )
            res.json({ "token" : token });
        else
            res.status(401).json({})

    }

    secrets = async (req:any, res: any)  => {

        this.service.setJWTStrategy(passport);

        passport.authenticate('jwt', function(err, user) {

            if(err)
                throw(err);

            else if(!!user)
                res.status(200).json({"secrets" : "Secret Stuff"});

            else
                res.status(401).json({});

        })(req, res)
    }
       
}

