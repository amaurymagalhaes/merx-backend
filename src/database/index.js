import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Transaction from '../app/models/Transaction';
import Balance from '../app/models/Balance';
import Friendships from '../app/models/Friendship';
import Business from '../app/models/Business';

const models = [User, Transaction, Balance, Friendships, Business];

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
