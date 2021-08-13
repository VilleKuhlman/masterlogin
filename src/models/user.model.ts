import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

import * as bcrypt from 'bcrypt';


export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<User, "id"> {}

export class UserModel extends Model<User, UserCreationAttributes> 
implements User {

    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    validPassword!: (password: string) => Promise<boolean>;
}

export const initializeModel = (sequelize: Sequelize) => UserModel.init(
      {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
      },
      
      {
        setterMethods: {
            cryptPassword(password) {
                bcrypt.genSalt(12, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        // Store hash in your password DB.
                        this.setDataValue('password', hash);
                    });
                });
     
            }
        },
        tableName: "user",
        timestamps: false,
        sequelize,
      }             
  );
  
  UserModel.prototype.validPassword = function (password) {
     return bcrypt.compare(password, this.password);
  }