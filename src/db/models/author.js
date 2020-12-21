const authors = (sequelize, DataTypes) => {
  const Author = sequelize.define(
    'Author',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {}
  );
  Author.associate = (models) => {
    Author.hasMany(models.Book, {
      foreignKey: 'authorId',
      target: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Author;
};
export default authors;
