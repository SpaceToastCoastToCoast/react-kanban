module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
        isIn: [['ADMIN', 'USER']]
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Card, {
          as: 'creator',
          foreignKey: 'creator_id'
        });
        User.hasMany(models.Card, {
          as: 'assignee',
          foreignKey: 'assignee_id'
        });
      }
    },
  });

  return User;
};