'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Review, {foreignKey: 'reviewId'})
      Image.belongsTo(models.Spot, {foreignKey: 'spotId'})
    }
  }
  Image.init({
    spotId: {
      type: DataTypes.INTEGER,
      onDelete: 'cascade'
    },
    reviewId: {
      type: DataTypes.INTEGER,
      onDelete: 'cascade'
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
  }, {
    sequelize,
    modelName: 'Image',
    defaultScope: {
      attributes: {
        exclude: [ "spotId", "reviewId", "createdAt", "updatedAt"]
      }
    },
  });
  return Image;
};
