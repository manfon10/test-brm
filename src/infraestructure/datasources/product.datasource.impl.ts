import { CreateProductDto, ProductDatasource, ProductEntity } from "../../domain";

import Product from "../database/models/product.model";

export class ProductDatasourceImpl implements ProductDatasource {
  async create(data: CreateProductDto): Promise<ProductEntity> {
    const product = await Product.create(data);

    return ProductEntity.fromObject(product);
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await Product.findAll({
      attributes: ["id", "batch_number", "name", "price", "quantity_available", "entry_date"],
    });

    return products.map(ProductEntity.fromObject);
  }

  async findById(id: number): Promise<ProductEntity | null> {
    const product = await Product.findOne({
      attributes: ["id", "batch_number", "name", "price", "quantity_available", "entry_date"],
      where: { id },
    });

    return product ? ProductEntity.fromObject(product) : null;
  }

  async update(id: number, product: Partial<ProductEntity>): Promise<ProductEntity> {
    const [, [updatedProduct]] = await Product.update(product, {
      where: { id },
      returning: true,
    });

    return ProductEntity.fromObject(updatedProduct);
  }

  async delete(id: number): Promise<void> {
    await Product.destroy({ where: { id } });
  }
}
