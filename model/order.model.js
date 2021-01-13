module.exports = (sequelize, DataTypes) => {

    const Order = sequelize.define('tb-order', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Order;
}
