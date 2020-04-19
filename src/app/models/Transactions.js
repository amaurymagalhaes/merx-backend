import Sequelize, { Model } from 'sequelize';

class Transactions extends Model {
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

export default Transactions;
