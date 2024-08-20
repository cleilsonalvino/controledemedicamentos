import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, {
    host: process.env.DB_HOST!,
    dialect: 'mysql',
    logging: false,
});

const testarConexao = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conectado com sucesso ao banco de dados!');
    } catch (erro) {
        if (erro instanceof Error) {
            console.error('Falha ao se conectar ao banco de dados:', erro.message);
        } else {
            console.error('Falha ao se conectar ao banco de dados:', erro);
        }
    }
};

testarConexao();

export default sequelize;
