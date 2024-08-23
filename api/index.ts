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
app.use(express.static(path.join(__dirname, '../../public')));

// Rota para renderizar a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

// Endpoint para obter todos os medicamentos
app.get('/get-medications', async (req, res) => {
    const agora = new Date();
    const horaAtual = agora.toTimeString().slice(0, 8); // Formato HH:MM:SS
    console.log(horaAtual);
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

    atualizarMedicamentos().catch(console.error);
});

// Endpoint para adicionar um medicamento
app.post('/add-medication', async (req, res) => {
    try 
    {
        const hoje = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD

        const { nome, hora, quantidade, ultima_atualizacao} = req.body;
        await Medicamento.create({ nome, hora, quantidade, ultima_atualizacao: hoje });
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

const atualizarMedicamentos = async () => {
    const hoje = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
    const agora = new Date();
    const horaAtual = agora.toTimeString().slice(0, 8); // Formato HH:MM:SS

    try {
        // Busca todos os medicamentos
        const medicamentos = await Medicamento.findAll();

        for (const medicamento of medicamentos) {
            // Verifica se `ultima_atualizacao` é válido
            let ultimaAtualizacaoStr = '';
            if (medicamento.ultima_atualizacao) {
                const ultimaAtualizacaoDate = new Date(medicamento.ultima_atualizacao);
                if (!isNaN(ultimaAtualizacaoDate.getTime())) { // Verifica se a data é válida
                    ultimaAtualizacaoStr = ultimaAtualizacaoDate.toISOString().slice(0, 10);
                }
            }

            // Garantindo que `hora` é uma string no formato HH:MM:SS
            const horaMedicamento = medicamento.hora?.toString() || ''; // Convertendo para string

            // Verifica se o medicamento foi atualizado hoje
            if (ultimaAtualizacaoStr === hoje) {
                console.log(`Atualização já realizada hoje para o medicamento ${medicamento.nome}.`);
                continue;
            }

            // Verifica se o medicamento tem o ID 5 é hora de administrá-lo
            if (medicamento.id_medicamentos === 5 && horaMedicamento <= horaAtual && medicamento.quantidade > 0) {
                const novaQuantidade = medicamento.diminuirDois();
                await Medicamento.update(
                    {
                        quantidade: novaQuantidade,
                        ultima_atualizacao: hoje
                    },
                    { where: { id_medicamentos: medicamento.id_medicamentos } }
                );
                console.log(`Quantidade do medicamento ${medicamento.nome} atualizada para ${novaQuantidade}.`);

            // Verifica se o medicamento tem o ID 20 é hora de administrá-lo
            } else if (medicamento.id_medicamentos === 20 && horaMedicamento <= horaAtual && medicamento.quantidade > 0) {
                const novaQuantidade = medicamento.diminuirDois();
                await Medicamento.update(
                    {
                        quantidade: novaQuantidade,
                        ultima_atualizacao: hoje
                    },
                    { where: { id_medicamentos: medicamento.id_medicamentos } }
                );
                console.log(`Quantidade do medicamento ${medicamento.nome} atualizada para ${novaQuantidade}.`);

            //verifica os outros
            } else if (horaMedicamento <= horaAtual && medicamento.quantidade > 0) {
                await Medicamento.update(
                    {
                        quantidade: Sequelize.literal('quantidade - 1'),
                        ultima_atualizacao: hoje
                    },
                    { where: { id_medicamentos: medicamento.id_medicamentos } }
                );
                console.log(`Quantidade do medicamento ${medicamento.nome} atualizada.`);
            } 
        }

        console.log('Atualização concluída.');
    } catch (error) {
        console.error('Erro ao atualizar medicamentos:', error);
    }
};

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
