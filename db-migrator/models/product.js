const Sequelize = require('sequelize-cockroachdb');

const attributes = {
  product_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  business_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'business',
      key: 'business_id',
    },
  },
  category_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'category',
      key: 'category_id',
    },
  },
  name: {
    type: Sequelize.STRING,
  },
  sku: {
    type: Sequelize.INTEGER,
  },
  size: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  sold_date: {
    type: Sequelize.DATE
  },
  s3_key: {
    type: Sequelize.STRING,
  },
  listing_history: {
    type: Sequelize.JSON
  },
  price_history: {
    type: Sequelize.JSON
  }

};

const getOptions = (sequelize) => ({
  sequelize,
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
  indexes: [{fields: ['sku']}, {fields: ['sold_date']}]
});

const getProductModel = (sequelize) => {
  return sequelize.define('product', attributes, getOptions(sequelize));
};

module.exports = getProductModel;
