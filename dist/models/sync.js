"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db")); // Certifique-se de que esse é o arquivo que contém sua conexão com o Sequelize
const syncDatabase = async () => {
    try {
        await db_1.default.sync({ force: true }); // Cuidado: Isso apagará dados existentes na tabela
        console.log('Banco de dados e tabelas sincronizados com sucesso!');
    }
    catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
};
syncDatabase();
