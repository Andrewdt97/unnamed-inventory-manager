const Sequelize = require('sequelize-cockroachdb');

const attributes = {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
  },
  cognito_username: {
    type: Sequelize.STRING,
  },
};

const getOptions = (sequelize) => ({
  sequelize,
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
});

const getUserModel = (sequelize) => {
  return sequelize.define('user', attributes, getOptions(sequelize));
};

module.exports = getUserModel;
