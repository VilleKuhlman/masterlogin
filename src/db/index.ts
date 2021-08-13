import { Options, Sequelize } from "sequelize"

import dbConfig from "../config/db.config.json"
import { initializeModel } from "../models/user.model";

export const dbInstance = new Sequelize(dbConfig as Options);

export const initializeDB = async () => {    

    await dbInstance.authenticate().catch(e => {throw(e)}).then(async () => {

        initializeModel(dbInstance);
        await dbInstance.sync();

    });   
}