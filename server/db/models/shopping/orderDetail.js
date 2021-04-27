const { DataTypes, Model } = require('sequelize');
const db = require('../../db');

class OrderDetail extends Model {}

OrderDetail.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      //allowNull: true // changed to true to trigger defaultValue when seeding data
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  { sequelize: db, modelName: 'order_detail' }
);

module.exports = OrderDetail;
