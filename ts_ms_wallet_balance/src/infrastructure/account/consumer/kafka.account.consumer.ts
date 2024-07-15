import { KafkaClient, Consumer, Message } from "kafka-node";
import { Kafka, logLevel, Admin } from 'kafkajs';
import SaveAccountUseCase from "../../../application/account/save.account.usecase";

interface Payload {
    account_id_from: string;
    balance_account_id_from: number;
    account_id_to: string;
    balance_account_id_to: number;
}

interface BalanceUpdateMessage {
  Payload: Payload;
}

export default class KafkaAccountConsumer {
    private _consumer!: Consumer;
    private _client!: KafkaClient;
    private _saveAccountUseCase: SaveAccountUseCase;
    private _admin: Admin;

    constructor(
        kafkaHost: string, 
        topic: string,
        saveAccountUseCase: SaveAccountUseCase
    ) {
        this._saveAccountUseCase = saveAccountUseCase;

        // Inicializa o cliente KafkaJS e Admin
        const kafka = new Kafka({
            clientId: 'ts-ms-wallet-balance',
            brokers: [kafkaHost],
            logLevel: logLevel.INFO,
        });
        this._admin = kafka.admin();

        // Cria o tópico se ele não existir
        this.createTopicIfNotExists(topic)
            .then(() => {
                // Inicializa o cliente kafka-node e o consumidor
                this._client = new KafkaClient({ kafkaHost });
                this._consumer = new Consumer(
                    this._client, 
                    [{ topic }], 
                    {}
                );
                this.setup();
            })
            .catch(console.error);
    }

    private async createTopicIfNotExists(topic: string) {
        await this._admin.connect();
        const topics = await this._admin.listTopics();

        if (!topics.includes(topic)) {
            console.log(`Creating topic: ${topic}`);
            await this._admin.createTopics({
                topics: [{ topic }],
            });
        } else {
            console.log(`Topic ${topic} already exists`);
        }

        await this._admin.disconnect();
    }

    private setup() {
        this._consumer.on("message", async (message: Message) => {
            try {
                const buMessage: BalanceUpdateMessage = JSON.parse(message.value.toString());
                const payload: Payload = buMessage.Payload;

                await this._saveAccountUseCase.execute({
                    id: payload.account_id_from,
                    balance: payload.balance_account_id_from,
                });

                await this._saveAccountUseCase.execute({
                    id: payload.account_id_to,
                    balance: payload.balance_account_id_to,
                });

            } catch (error) {
                console.error("Error processing message:", error);
            }
        });

        this._consumer.on("error", (error) => {
            console.error("Kafka consumer error:", error);
        });
    }
}
