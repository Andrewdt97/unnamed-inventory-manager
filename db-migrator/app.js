const Sequelize = require('sequelize-cockroachdb');
const initializeModels = require('./models');

// Connect to CockroachDB through Sequelize.
const connectionString = process.env.DATABASE_URL;
const sequelize = new Sequelize(connectionString, {
  dialectOptions: {
    application_name: 'docs_simplecrud_node-sequelize',
  },
});

(async () => {
  initializeModels(sequelize);
  await sequelize.sync();
  // // const model = await getUserModel(sequelize);
  // console.log(sequelize.models.user)
  // await sequelize.models.user.bulkCreate([{email: 'andrewdt97@gmail.com', cognito_username: 'andrew', business_id: 69, user_id: 1}, {email: 'andrewdt98@gmail.com', cognito_username: 'tim'}]);
})();