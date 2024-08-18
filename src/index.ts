import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { Sequelize, Op } from 'sequelize';
import Medicamento from '../models/medicamento'; // Importe seu modelo

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Rota para renderizar a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Endpoint para obter todos os medicamentos
app.get('/get-medications', async (req, res) => {
    try {
        // Ordenar medicamentos pelo horário (do mais cedo para o mais tarde)
        const medications = await Medicamento.findAll({
            order: [['hora', 'ASC']]
        });
        res.json(medications);
    } catch (error) {
        console.error('Erro ao obter medicamentos:', error);
        res.status(500).send('Erro ao obter medicamentos');
    }
});

// Endpoint para adicionar um medicamento
app.post('/add-medication', async (req, res) => {
    try {
        const { nome, hora, quantidade } = req.body;
        await Medicamento.create({ nome, hora, quantidade });
        res.status(201).send('Medicamento adicionado com sucesso');
    } catch (error) {
        console.error('Erro ao adicionar medicamento:', error);
        res.status(500).send('Erro ao adicionar medicamento');
    }
});

// Endpoint para excluir um medicamento
app.post('/remove-medication', async (req, res) => {
    try {
        const { id } = req.body;
        await Medicamento.destroy({ where: { id_medicamentos: id } });
        res.send('Medicamento excluído com sucesso');
    } catch (error) {
        console.error('Erro ao excluir medicamento:', error);
        res.status(500).send('Erro ao excluir medicamento');
    }
});

// Endpoint para editar um medicamento
app.post('/edit-medication', async (req, res) => {
    try {
        const { id, hora, quantidade } = req.body;
        await Medicamento.update({ hora, quantidade }, { where: { id_medicamentos: id } });
        res.send('Medicamento atualizado com sucesso');
    } catch (error) {
        console.error('Erro ao editar medicamento:', error);
        res.status(500).send('Erro ao editar medicamento');
    }
});

// Função para atualizar a quantidade dos medicamentos
const atualizarMedicamentos = async () => {
    // Obtém a data atual
    const hoje = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
    const agora = new Date();
    const horaAtual = agora.toTimeString().slice(0, 8); // Formato HH:MM:SS

    // Verifica se a atualização foi feita hoje
    const ultimaAtualizacao = await Medicamento.findOne({
        attributes: ['ultima_atualizacao'],
        where: {
            ultima_atualizacao: {
                [Op.gte]: hoje
            }
        }
    });

    if (ultimaAtualizacao) {
        console.log('Atualização já realizada hoje.');
        return;
    }

    // Atualiza a quantidade dos medicamentos
    const medicamentos = await Medicamento.findAll();

    for (const medicamento of medicamentos) {
        if (medicamento.hora <= horaAtual && medicamento.quantidade > 0) {
            // Diminuir a quantidade
            await Medicamento.update(
                { quantidade: Sequelize.literal('quantidade - 1') },
                { where: { id_medicamentos: medicamento.id_medicamentos } }
            );
        }
    }

    // Atualiza a data da última atualização
    await Medicamento.update(
        { ultima_atualizacao: hoje },
        { where: {} } // Atualiza a todos os registros
    );
};

// Exemplo de uso
atualizarMedicamentos().catch(console.error);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
