

const Category = {
  up: queryInterface => queryInterface.bulkInsert('Categories', [
    {
      name: 'defaults',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'technology',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'experiences',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'adventure',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Categories', null, {})
};

export default Category;
