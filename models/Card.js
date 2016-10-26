module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define("Card", {
    title: {
      type: DataTypes.STRING,
      validate: {
        validateTitle: (value) => {
          if(/[{}<>;]/g.test(value)) {
            throw new TypeError("invalid characters in title");
          }
        },
        len: [2, 255]
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        validateDescription: (value) => {
          if(/[{}<>;]/g.test(value)) {
            throw new TypeError("invalid characters in description");
          }
        }
      }
    },
    priority: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true,
        len: [2, 255]
      }
    },
    status: {
      type: DataTypes.STRING,
      default: 'TO DO',
      validate: {
        isIn: [['TO DO', 'DOING', 'DONE']]
      }
    },
    creator_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    },
    assignee_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Card.belongsTo(models.User);
      }
    }
  });

  return Card;
};