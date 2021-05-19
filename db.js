import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { Op } = Sequelize;
const db = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorsAliases: Op,
  },
);

db.authenticate().then(
  () => {
    console.log('Connected to DB');
  },

  (err) => {
    console.log(`Error: ${err}`);
  },
);

export default db;
