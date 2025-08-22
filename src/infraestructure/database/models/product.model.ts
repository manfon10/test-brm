import { DataTypes, Model, Sequelize } from "sequelize";
import { SequelizeModel } from "../sequelize";

interface ProductAttributes {
  id: number;
  batch_number: string;
  name: string;
  price: number;
  quantity_available: number;
  entry_date: Date;
}

type ProductCreationAttributes = Partial<ProductAttributes>;

class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  public id!: number;
  public batch_number!: string;
  public name!: string;
  public price!: number;
  public quantity_available!: number;
  public entry_date!: Date;

  static associate(models: { [key: string]: SequelizeModel }) {
    Product.hasMany(models.OrderItem, { as: "order_items", foreignKey: "product_id" });
  }

  static initModel(sequelize: Sequelize) {
    Product.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        batch_number: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        quantity_available: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        entry_date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      { modelName: "Product", paranoid: true, sequelize }
    );
  }
}

export default Product;
