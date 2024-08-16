"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('sql10726424', 'sql10726424', 'L3iceNTDiF', {
    host: 'sql10.freesqldatabase.com',
    dialect: 'mysql',
    logging: false,
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
