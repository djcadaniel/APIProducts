import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
dotenv.config()

// console.log(process.env.DATABASE_URL)

const db = new Sequelize(process.env.DATABASE_URL!,{
  // models: [__dirname + '/../models/**/*.ts'],
  models: [__dirname + '/../models/**/*'],
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
  // logging: false
});

// const db = new Sequelize('postgresql://rest_api_node_typescript_klf1_user:HOeH9uBNMiXLsbp7M1obkrHPz1y9rkxj@dpg-cu2mhbpopnds73f1d0o0-a.oregon-postgres.render.com/rest_api_node_typescript_klf1', {
//   dialectOptions: {
//     ssl:{
//       require: false
//     }
//   }
// });

export default db;