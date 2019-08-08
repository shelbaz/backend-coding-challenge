module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('cities', {fields: ['name'], using:'gin', operator:'gin_trgm_ops'});
   },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('cities','name');
  }
};