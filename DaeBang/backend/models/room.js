const Sequelize = require("sequelize");

module.exports = class Room extends Sequelize.Model {
    static init(sequelize){
        return super.init(
            {
                title: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
                content: {
                    type: Sequelize.TEXT
                },
                address: {
                    type: Sequelize.TEXT,
                    allowNull: false
                },
                latitude: {
                    type: Sequelize.STRING(200)
                },
                longitude: {
                    type: Sequelize.STRING(200)
                }
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci"
            }
        )
    }
    static associate(db){
        // Room은 Seller에 연관되어 있다. => belongsTo
        db.Room.belongsTo(db.Seller, {foreignKey: "seller_id", targetKey: "id"});
        // Room은 여러개의 Option을 가질 수 있다. => hasMany
        db.Room.hasMany(db.Option, {foreignKey: "room_id", sourceKey: "id"});
        // Room은 여러개의 Image를 가질 수 있다. => hasMany
        db.Room.hasMany(db.Image, {foreignKey: "room_id", sourceKey: "id"});
    }
}