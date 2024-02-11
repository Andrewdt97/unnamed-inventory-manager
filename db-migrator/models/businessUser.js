const Sequelize = require('sequelize-cockroachdb');
const attributes = {
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'user',
      key: 'user_id',
    },
    primaryKey: true
  },
  business_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'business',
      key: 'business_id',
    },
    primaryKey: true
  },
};

const getOptions = (sequelize) => ({
  sequelize,
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
});

const getBusinessUserModel = (sequelize) => {
  const businessUserModel = sequelize.define('business_user', attributes, getOptions(sequelize));
  return businessUserModel;
};

module.exports = getBusinessUserModel;
