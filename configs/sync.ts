// sync.ts
import sequelize from '../models/db.js';
import Medication from '../models/medicamento';

async function syncDatabase() {
    try {
        // Sincroniza todos os modelos com o banco de dados
        await sequelize.sync({ force: true }); // 'force: true' recria as tabelas
        console.log('Banco de dados sincronizado com sucesso.');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
    // sequelize.sync({ alter: true })
    // .then(() => console.log('Banco de dados sincronizado'))
    // .catch(console.error);
}

// syncDatabase();
