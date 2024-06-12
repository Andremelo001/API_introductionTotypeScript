import 'es6-promise/auto';
import { createConnection } from 'typeorm';

createConnection().then(async (connection) => {
  console.log('Conexão com o banco de dados estabelecida!');
}).catch((error) => {
  console.log('Erro ao conectar-se ao banco de dados:', error);
});

