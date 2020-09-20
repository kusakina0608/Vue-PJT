const Sequelize = require("sequelize");

module.exports = class Portfolio extends Sequelize.Model {
    static init(sequelize){
        return super.init(
            {
                title:{
                    type:Sequelize.STRING(200),
                    allowNull: false,
                    unique: true
                },
                content: {
                    type: Sequelize.STRING(200),
                    allowNull: false
                },
                image: {
                    type: Sequelize.STRING(200),
                    allowNull: false
                },
                repository: {
                    type: Sequelize.STRING(200),
                    allowNull: false
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

    }
}