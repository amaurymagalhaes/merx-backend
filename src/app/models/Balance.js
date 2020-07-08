import Sequelize, { Model } from 'sequelize';

class Balance extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.FLOAT,
        last_transaction_id: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, {
      foreignKey: 'last_transaction_id',
      as: 'last_transaction',
    });
  }
}

export default Balance;
