'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dummyData = Array.from({ length: 10 }, () => ({
      name: faker.commerce.product(),
      price: faker.commerce.price({ min : 100 }),
      count: faker.number.int({ min: 1, max: 50 }),
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return queryInterface.bulkInsert('Items', dummyData, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items', null, {});
  }
};
