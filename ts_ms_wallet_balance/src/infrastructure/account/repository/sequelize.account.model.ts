// src/models/Account.ts
import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table({
  tableName: 'accounts',
  timestamps: false,
})
export default class AccountModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare balance: number;
}
