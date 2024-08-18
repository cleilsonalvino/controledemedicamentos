import { Sequelize } from 'sequelize';

// Conexão com o banco de dados MySQL
const sequelize = new Sequelize('controledemedicamentos', 'root', '', {
    host: "localhost",
    dialect: 'mysql'
});


sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso ao banco de dados!");
}).catch(function(erro){
    console.log("Falha ao se conectar: " + erro);
});


export default sequelize;
