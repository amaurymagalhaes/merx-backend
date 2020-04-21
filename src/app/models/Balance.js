import Sequelize, { Model } from 'sequelize';

class Balance extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.FLOAT,
        last_transaction_id: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER
      },
      { sequelize }
    );
    return this;
  }
}

export default Balance;
