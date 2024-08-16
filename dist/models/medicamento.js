"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("./db"));
class Medicamento extends sequelize_1.Model {
}
Medicamento.init({
    id_medicamentos: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    hora: {
        type: sequelize_1.DataTypes.TIME, // Usar STRING para hora no formato HH:MM:SS
        allowNull: false,
    },
    quantidade: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    ultima_atualizacao: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    }
}, {
    sequelize: db_1.default,
    modelName: 'Medicamento',
    tableName: 'medicamentos',
    timestamps: false // Desativa os campos createdAt e updatedAt
});
exports.default = Medicamento;
