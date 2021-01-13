module.exports = (sequelize, DataTypes) => {
    const BoxSize = sequelize.define("tb-box-size", {

        size: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return BoxSize;
}
