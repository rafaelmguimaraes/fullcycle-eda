import AccountRepositoryInterface from "../../domain/account/repository/account.repository.interface";
import { InputFindAccountDto, OutputFindAccountDto } from "./find.account.dto";

export default class FindAccountUseCase {
    constructor(private accountRepository: AccountRepositoryInterface) {}
    async execute(input: InputFindAccountDto): Promise<OutputFindAccountDto> {
        return await this.accountRepository.find(input.id);
    }
}