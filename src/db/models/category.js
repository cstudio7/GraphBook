const category = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: {
          msg: 'Category name is required.'
        }
      }
    }
  });

  Category.associate = (models) => {
    Category.hasMany(models.Book, {
      foreignKey: 'categoryId',
      as: 'category',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Category;
};
export default category;
