const { DataTypes } = require('sequelize');
const db = require('_helpers/db');

module.exports = (sequelize) => {
    const Url = sequelize.define('Url', {
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hits: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {});
    Url.associate = function(models) {
        Url.belongsTo(db.User, {foreignKey: "userId"})
    }
    return Url;
};