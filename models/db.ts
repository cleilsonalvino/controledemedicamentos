import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize("postgres://default:bEF02pZdgeAu@ep-shy-fog-a4o569li-pooler.us-east-1.aws.neon.tech:5432/verceldb", {
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
