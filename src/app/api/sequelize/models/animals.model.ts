import { Sequelize, Model, DataTypes } from "sequelize";
import { getSequelizeInstance } from "../database"; 

class Animal extends Model{
    public animal_id!: number;
    public name!: string;
    public age!: number;
    public weight!: number;
    public image_url!: string;
}
Animal.init({
    animal_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: getSequelizeInstance(), // Replace with your actual database connection string
    modelName: 'Animal',
    tableName: 'animals',
    timestamps: false
});

export default Animal;