const sequelize = require('sequelize');
const getBusinessModel = require('./business');
const getUserModel = require('./user');
const getBusinessUserModel = require('./businessUser');
const getCategoryModel = require('./category');
const getProductModel = require('./product');

const initializeModels = (sequelize) => {
  getBusinessModel(sequelize);
  getUserModel(sequelize);
  getBusinessUserModel(sequelize);
  getCategoryModel(sequelize);
  getProductModel(sequelize);
};
module.exports = initializeModels;
