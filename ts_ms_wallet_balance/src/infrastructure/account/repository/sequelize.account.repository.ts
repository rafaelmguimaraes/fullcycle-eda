import Account from "../../../domain/account/entity/account";
import AccountModel from "./sequelize.account.model";
import AccountRepositoryInterface from "../../../domain/account/repository/account.repository.interface";

export default class AccountRepository implements AccountRepositoryInterface {
    async save(entity: Account): Promise<void> {
        // Save to database - find, if exists update, if not create
        const account = await AccountModel.findByPk(entity.id);
        if (account) {
            await AccountModel.update({
                balance: entity.balance
            }, {
                where: {
                    id: entity.id
                }
            });
        } else {
            await AccountModel.create({
                id: entity.id,
                balance: entity.balance
            });
        }
    }
    async find(id: string): Promise<Account> {
        // Find from database with async/await
        const account = await AccountModel.findByPk(id);
        if (!account) {
            throw new Error('Account not found');
        }
        return new Account(account.id, account.balance);
    }
    
}