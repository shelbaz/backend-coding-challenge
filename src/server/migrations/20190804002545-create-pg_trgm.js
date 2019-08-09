module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS pg_trgm;');
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query();
  }
};