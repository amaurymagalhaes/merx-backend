import Balance from '../models/Balance';
import User from '../models/User';
import Transactions from '../models/Transactions';

class BalanceController {
  async store(req, res) {
    const balance = await Balance.create(req.body);

    return res.json(balance);
  }

  async show(req, res) {
    const balance = await Balance.findByPk(req.params.id);

    return res.json(balance);
  }
}

export default new BalanceController();
