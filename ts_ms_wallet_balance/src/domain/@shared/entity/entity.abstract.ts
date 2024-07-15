export default abstract class Entity {
  protected _id!: string;

  constructor() {}

  get id(): string {
    return this._id;
  }
}