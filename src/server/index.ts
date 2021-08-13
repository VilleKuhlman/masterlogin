import express, { Express, Request } from "express";
import { AuthRoutes } from './api-routes/auth.routes';
import http from "http";
import path from "path";
import cors from "cors";

export class Server {

    constructor(private port: number = 8000, private router: AuthRoutes = new AuthRoutes()){ }   

    /* Construct and return cors-options*/
    getCorsOptions = (req: Request, callback: any) => {   
        const whitelist: Array<string | undefined> = []; 
        const isAllowedDomain = req.header('Origin')?.includes('localhost') || whitelist.includes(req.header('Origin'));
        const corsOptions = isAllowedDomain ? { origin: true } : { origin: false };
        callback(null, corsOptions)
    }

    /* In case of unhandled error --> catch it with the Express default error handler  */
    handleError = (application: Express) => {
        application.use(function (err:any, req:any, res:any, next:any) {
             console.error('Unexpected Server error: ', err);
             res.status(500).send('Unexpected Server error: ', err)
         });
     }

    /* Get Server Resources in a form of Express application - middleware */
    initializeResources = async () => {

        const application = express();
        application.use(express.json());
        application.use(cors(this.getCorsOptions));

        application.use('/auth', await this.router.getAuthRoutes());
        application.use('/api', await this.router.getApiRoutes());
        
        application.use(express.static("./public/dist/demo-login-client"));
        application.get('*', (req, res) => res.sendFile(path.resolve('public', 'dist', 'demo-login-client', 'index.html')));

        this.handleError(application);

        const server = http.createServer(application);
        server.listen(this.port);
        
    }

}