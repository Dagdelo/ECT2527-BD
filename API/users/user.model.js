const { DataTypes } = require('sequelize');
const db = require('_helpers/db');

module.exports = (sequelize) => {
    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };
    const User = sequelize.define('User', {
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false }
    }, options);
    User.associate = function() {
        User.hasMany(db.Url, { foreignKey: "urlId" })
    }
    return User;
};