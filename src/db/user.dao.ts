
import { UserModel } from "../models/user.model";
import bcrypt from 'bcrypt';

export class UserDAO {
    
    constructor(private model = UserModel, private readonly saltRounds = 12){} 
  
    createRecord = async (email:string, password:string) => {

        const salt = await bcrypt.genSalt(12);

        const hash = await bcrypt.hash(password, salt);

        const user = {firstName:"xx", lastName:"xxx", email:email, password:hash};

        return await this.model.create(user).catch(e => {throw(e)});
        
    }


    findRecordByEmail = async (email: string) => {

        return await this.model.findOne({ where: { email: email } });

    }

    validateLogin = async (email: string, password: string, done: any) => {

        this.findRecordByEmail(email)
        .catch(err => { return done(err) })        
        .then(user => { return done(null, (!!user && !!user.verifyPassword(password) ? user : null)) })
    
    }

}