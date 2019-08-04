'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cities = sequelize.define('Cities', {
    name: DataTypes.STRING,
    country_code: DataTypes.STRING,
    admin1_code: DataTypes.STRING,
    longitude: DataTypes.INTEGER,
    latitude: DataTypes.INTEGER
  }, {});
  Cities.associate = function(models) {
    // associations can be defined here
  };
  return Cities;
};