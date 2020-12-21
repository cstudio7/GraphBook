const books = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Must be an integer number'
          }
        }
      },
      coverImage: {
        type: DataTypes.STRING,
        allowNull: true,
        validadate: {
          isUrl: {
            msg: 'Must be a valid url'
          }
        }
      },
      authorId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true
        }
      },
    },
    {}
  );
  Book.associate = (models) => {
    Book.belongsTo(models.Author, {
      foreignKey: 'id',
      as: 'author',
      onDelete: 'CASCADE'
    });
    Book.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });
  };
  return Book;
};

export default books;
