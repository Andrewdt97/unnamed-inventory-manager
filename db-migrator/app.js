const Sequelize = require('sequelize-cockroachdb');
const initializeModels = require('./models');

const [, , env] = process.argv;
if (!env) {
  console.error('PLEASE PASS AN ENVIRONMENT ARGUMENT. ABORTING.');
  process.exit(1);
}

let connectionString = '';
if (env === 'local') {
  connectionString = 'postgres://admin:@localhost:5432/inventory_manager';
} else if (env === 'prod') {
  connectionString = process.env.DATABASE_URL;
}
// Connect to CockroachDB through Sequelize.
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
