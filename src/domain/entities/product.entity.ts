export class ProductEntity {
  constructor(
    public id: number,
    public batch_number: string,
    public name: string,
    public price: number,
    public quantity_available: number,
    public entry_date: Date
  ) {}

  static fromObject(object: { [key: string]: any }): ProductEntity {
    const { id, batch_number, name, price, quantity_available, entry_date } = object;

    return new ProductEntity(id, batch_number, name, price, quantity_available, entry_date);
  }
}
