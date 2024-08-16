import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sql10726424', 'sql10726424', 'L3iceNTDiF', {
    host: 'sql10.freesqldatabase.com',
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
