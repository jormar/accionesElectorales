// Example model


module.exports = function (sequelize, DataTypes) {

  var Action = sequelize.define('Action', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    action: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    author: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  });

  return Action;
};

