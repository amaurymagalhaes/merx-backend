import Sequelize, { Model } from 'sequelize';

class Transaction extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.FLOAT,
        source_id: Sequelize.INTEGER,
        destiny_id: Sequelize.INTEGER,
      },
      { sequelize }
    );
    return this;
  }
}

export default Transaction;
