const Sequelize = require('sequelize-cockroachdb');

const attributes = {
  category_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  }
};

const getOptions = (sequelize) => ({
  sequelize,
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
});

const getCategoryModel = (sequelize) => {
  return sequelize.define('category', attributes, getOptions(sequelize));
};

module.exports = getCategoryModel;
