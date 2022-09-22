'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey: 'ownerId', as: 'Owner'})
      Spot.hasMany(models.Booking, {foreignKey: 'spotId', onDelete: 'cascade', hooks: true})
      Spot.hasMany(models.Review, {foreignKey: 'spotId', onDelete: 'cascade', hooks: true})
      Spot.hasMany(models.Image, {foreignKey: 'spotId', onDelete: 'cascade', hooks: true})
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true
      }

    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true
      }

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 49]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    pricePerNight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    previewImage: {
      type: DataTypes.STRING,
      // allowNull: false
      validate: {
        isUrl: true
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',
    indexes: [
      {
        unique: true,
        fields: ['address', 'city', 'state', 'latitude', 'longitude']
      }
    ]
  });
  return Spot;
};
