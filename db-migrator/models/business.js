const Sequelize = require('sequelize-cockroachdb');

const attributes = {
  business_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
  },
  sku_prefix: {
    type: Sequelize.STRING,
  },

};

const getOptions = (sequelize) => ({
  sequelize,
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
});

const getBusinessModel = (sequelize) => {
  return sequelize.define('business', attributes, getOptions(sequelize));
};

module.exports = getBusinessModel;
