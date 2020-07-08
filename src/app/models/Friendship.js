import Sequelize, { Model } from 'sequelize';

class Friendship extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id_1: Sequelize.INTEGER,
        user_id_2: Sequelize.INTEGER,
      },
      { sequelize }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id_1', as: 'user_1' });
    this.belongsTo(models.User, { foreignKey: 'user_id_2', as: 'user_2' });
  }
}

export default Friendship;
