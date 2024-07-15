import Account from "../../domain/account/entity/account";
import AccountRepositoryInterface from "../../domain/account/repository/account.repository.interface";
import { InputSaveAccountDto } from "./save.account.dto";

export default class SaveAccountUseCase {
  constructor(private accountRepository: AccountRepositoryInterface) {}

  async execute(input: InputSaveAccountDto): Promise<void> {
    const account = new Account(input.id, input.balance);
    await this.accountRepository.save(account);
  }
}