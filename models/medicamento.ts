import { DataTypes, Model } from 'sequelize';
import sequelize from './db';

class Medicamento extends Model {
    public id_medicamentos!: number;
    public nome!: string;
    public hora!: string; // Usar string para hora
    public quantidade!: number;
    public ultima_atualizacao!: Date;

    public diminuirDois(): void {
        if (this.quantidade >= 2) {
            this.quantidade -= 2;
            this.save(); // Salva a mudança no banco de dados
        } else {
            throw new Error('Quantidade insuficiente para subtrair 2 unidades');
        }
    }
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
        type: DataTypes.TIME, // Usar STRING para hora no formato HH:MM:SS
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ultima_atualizacao: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'Medicamento',
    tableName: 'medicamentos',
    timestamps: false // Desativa os campos createdAt e updatedAt
});

export default Medicamento;
