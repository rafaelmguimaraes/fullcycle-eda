import Account from "./account";

describe('Account Unit Tests', () => {
    it('should create an account', () => {
        // Arrange
        const id = '1';
        const balance = 100;
        // Act
        const account = new Account(id, balance);
        // Assert
        expect(account).not.toBeNull();
        expect(account).toBeInstanceOf(Account);
        expect(account.balance).toBe(balance);
        expect(account.id).toBe(id);
    })
})