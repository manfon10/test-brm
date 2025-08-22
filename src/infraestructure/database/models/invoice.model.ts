import { DataTypes, Model, Sequelize } from "sequelize";

import { SequelizeModel } from "../sequelize";

interface InvoiceAttributes {
  id: number;
  order_id: number;
  invoice_number: string;
  issue_date: Date;
  total_amount: number;
}

type InvoiceCreationAttributes = Partial<InvoiceAttributes>;

class Invoice extends Model<InvoiceAttributes, InvoiceCreationAttributes> {
  public id!: number;
  public order_id!: number;
  public invoice_number!: string;
  public issue_date!: Date;
  public total_amount!: number;

  static associate(models: { [key: string]: SequelizeModel }) {
    Invoice.belongsTo(models.Order, { as: "order", foreignKey: "order_id" });
  }

  static initModel(sequelize: Sequelize) {
    Invoice.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        order_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "orders",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        invoice_number: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        issue_date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        total_amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { modelName: "Invoice", paranoid: true, sequelize }
    );
  }
}

export default Invoice;
