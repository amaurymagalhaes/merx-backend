import Balance from '../models/Balance';

class BalanceController {
  async store(req, res) {
    const Balance = await Balance.create(req.body);

    return res.json(Balance);
  }

  async show(req, res) {
    const balance = await Balance.findByPk(req.params.id);

    return res.json(balance);
  }
}

export default new BalanceController();
