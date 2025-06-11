import {Sequelize} from 'sequelize';
import {config} from 'dotenv';
config(); 

const credentials = {
    username: process.env['PGUSER'] ?? '',
    password: process.env['PGPASSWORD'] ?? '',
    database: process.env['PGDATABASE'] ?? '',
    host: process.env['PGHOST'] ?? '',
    options: {
        dialect: 'postgres' ,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // This is important for self-signed certificates
            }
        }
    }
}

let sequelizeInstance: Sequelize | null = null;
export const getSequelizeInstance = (): Sequelize => {
    if (!sequelizeInstance) {
        sequelizeInstance = new Sequelize(credentials.database, credentials.username, credentials.password, {
        host: credentials.host,
        dialect: 'postgres',
        dialectOptions: credentials.options.dialectOptions,
        });
    }
    return sequelizeInstance;
    }
