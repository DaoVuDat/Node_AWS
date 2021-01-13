module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("tb-product", {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return Product;
}
