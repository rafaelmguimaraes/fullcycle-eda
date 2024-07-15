import { app } from "./express";
import { Sequelize } from "sequelize-typescript";
import KafkaAccountConsumer from "../account/consumer/kafka.account.consumer";
import SaveAccountUseCase from "../../application/account/save.account.usecase";
import AccountModel from "../account/repository/sequelize.account.model";
import AccountRepository from "../account/repository/sequelize.account.repository";

const KAFKA_HOST = process.env.KAFKA_HOST || "kafka:29092";
const KAFKA_TOPIC = process.env.KAFKA_TOPIC || "balances";
const MYSQL_URL = process.env.MYSQL_URL || "mysql://root:root@mysql2:3306/balance";
const PORT: number = Number(process.env.PORT) || 3003;

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize(MYSQL_URL, { models: [AccountModel]
  });
  await sequelize.addModels([AccountModel]);
  await sequelize.sync();
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
setupDb();

new KafkaAccountConsumer(KAFKA_HOST, KAFKA_TOPIC, new SaveAccountUseCase(new AccountRepository()));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



