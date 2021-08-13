import passport from "passport";
import jwt from "jsonwebtoken";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserDAO } from "../db/user.dao";

export class AuthService {
  
    constructor(private readonly jwtSecret = '0.rfyj3n9nzhi', private dao = new UserDAO()){}

    register = async (req: any, res: any) => {
        
       return await this.dao.createRecord(req.body?.email, req.body?.password);
        
    }

    getToken = async (req: any, res: Response) => {
       
        const user = await new UserDAO().findRecordByEmail(req.body?.email);

        const validPassword = await user?.validPassword(req.body?.password).catch(e => { throw(e) });

        const validUser = !!user && !!req.body.password && !!validPassword;

        return validUser ? this.signToken(user) : null;

    }

    setJWTStrategy = async (passport:any) => {

        const opts = {secretOrKey: this.jwtSecret, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()};
   
         passport.use(new Strategy(opts, 
            
            function(jwt_payload, done) {
    
                new UserDAO().findRecordByEmail(jwt_payload.email)
                .catch(err => { return done(err) })
                .then(user => { return done(null, (!!user ? user : false)) })
    
            }
        
        ));      

    }

    signToken = (user: any) => {
               
        return jwt.sign({id:user.id, email:user.email}, this.jwtSecret);
        
    }

}