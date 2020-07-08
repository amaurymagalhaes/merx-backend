import Sequelize, { Model } from 'sequelize';

class Business extends Model {
  static init(sequelize) {
    super.init(
      {
        cnpj: Sequelize.STRING,
        name: Sequelize.STRING,
      },
      { sequelize }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' });
  }
}

export default Business;
