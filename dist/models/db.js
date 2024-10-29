"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize("postgres://default:bEF02pZdgeAu@ep-shy-fog-a4o569li-pooler.us-east-1.aws.neon.tech:5432/verceldb", {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true, // Para habilitar a conexão SSL
            rejectUnauthorized: false, // Não verificar a autoridade da conexão
        },
    },
});
const testarConexao = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conectado com sucesso ao banco de dados!');
    }
    catch (erro) {
        if (erro instanceof Error) {
            console.error('Falha ao se conectar ao banco de dados:', erro.message);
        }
        else {
            console.error('Falha ao se conectar ao banco de dados:', erro);
        }
    }
};
testarConexao();
exports.default = sequelize;
