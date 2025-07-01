import { DataTypes, Model } from 'sequelize';
import { getSequelizeInstance } from '../database';

class User extends Model {}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
  {
    sequelize: getSequelizeInstance(),
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  }
);

export default User;

