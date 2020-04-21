import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Balance from '../app/models/Balance';
import User from '../app/models/User';
import Transactions from '../app/models/Transactions';

const models = [Balance, User, Transactions];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
