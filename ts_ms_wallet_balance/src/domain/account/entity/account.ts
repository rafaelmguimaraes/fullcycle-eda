import Entity from "../../@shared/entity/entity.abstract";

export default class Account extends Entity {
    private _balance: number;

    constructor(id: string, balance: number) {
        super();
        this._id = id;
        this._balance = balance;
    }

    get balance(): number {
        return this._balance;
    }

    changeBalance(value: number): void {
        this._balance = value;
    }
}