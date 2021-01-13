module.exports= (sequelize , DataTypes) => {
    const StrawSize = sequelize.define("tb-straw-size", {

        size: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    });

    return StrawSize;
}
