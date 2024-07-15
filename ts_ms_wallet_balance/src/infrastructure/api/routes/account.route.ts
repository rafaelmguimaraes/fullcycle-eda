import { Router, Request, Response } from "express";
import FindAccountUseCase from "../../../application/account/find.account.usecase";
import { InputFindAccountDto } from "../../../application/account/find.account.dto";
import AccountRepository from "../../account/repository/sequelize.account.repository";


export const accountRoute = Router();

accountRoute.get("/:id", async (req: Request, res: Response) => {
    try {
        const findAccountUseCase = new FindAccountUseCase(new AccountRepository());
        const input: InputFindAccountDto = { id: req.params.id };
        const output = await findAccountUseCase.execute(input)
        res.status(200).send(output);
    } catch (error) {
        if (error instanceof(Error) && error.message === "Account not found") {
            res.status(404).send({ message: error.message });
        } else {
            res.status(500).send({ message: "Internal server error" });
        }
    }
});

