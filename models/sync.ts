import sequelize from './db'; // Certifique-se de que esse é o arquivo que contém sua conexão com o Sequelize
import Medicamento from './medicamento'; // Certifique-se de que o caminho está correto

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Cuidado: Isso apagará dados existentes na tabela
        console.log('Banco de dados e tabelas sincronizados com sucesso!');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
};

syncDatabase();
