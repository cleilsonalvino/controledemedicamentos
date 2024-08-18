import { DataTypes, Model } from 'sequelize';
import sequelize from './db';

class Medicamento extends Model {
    public id_medicamentos!: number;
    public nome!: string;
    public hora!: string;
    public quantidade!: number;
    public ultima_atualizacao!: string; // Adicionado para controle de atualização diária
}

Medicamento.init({
    id_medicamentos: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hora: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ultima_atualizacao: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'Medicamento',
    tableName: 'medicamentos',
    timestamps: false // Desativa os campos createdAt e updatedAt
});

export default Medicamento;
