"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// sync.ts
const db_js_1 = __importDefault(require("../models/db.js"));
async function syncDatabase() {
    try {
        // Sincroniza todos os modelos com o banco de dados
        await db_js_1.default.sync({ force: true }); // 'force: true' recria as tabelas
        console.log('Banco de dados sincronizado com sucesso.');
    }
    catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
    // sequelize.sync({ alter: true })
    // .then(() => console.log('Banco de dados sincronizado'))
    // .catch(console.error);
}
// syncDatabase();
