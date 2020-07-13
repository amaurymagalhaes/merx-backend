import Transaction from '../models/Transaction';
import User from '../models/User';
import Balance from '../models/Balance';
import { Op } from 'sequelize';

class TransactionsController {
  async store(req, res) {
    const sourceUserExists = await User.findOne({
      where: { id: req.body.source_id },
    });

    if (!sourceUserExists) {
      return res.status(400).json({ error: 'Source does not exists.' });
    }
    const destinyUserExists = await User.findOne({
      where: { id: req.body.destiny_id },
    });

    if (!destinyUserExists) {
      return res.status(400).json({ error: 'Destiny does not exists.' });
    }
    if (sourceUserExists.id === destinyUserExists.id) {
      return res
        .status(400)
        .json({ error: 'Source and Destiny can not be the same.' });
    }
    const BalanceSource = await Balance.findOne({
      where: { id: req.body.source_id },
    });

    if (BalanceSource.amount < req.body.amount) {
      return res.status(400).json({
        error: 'Source does not have the amount for the transaction.',
      });
    }

    const { id, amount, source_id, destiny_id } = await Transaction.create(
      req.body
    );

    const BalanceDestiny = await Balance.findOne({
      where: { id: destiny_id },
    });
    BalanceSource.update({
      last_transaction_id: id,
      amount: BalanceSource.amount - amount,
    });
    BalanceDestiny.update({
      last_transaction_id: id,
      amount: BalanceDestiny.amount + amount,
    });

    return res.json({
      id,
      amount,
      source_id,
      destiny_id,
    });
  }

  async index(req, res) {
    const transaction = await Transaction.findAll({
      where: {
        [Op.or]: [{ destiny_id: req.userId }, { source_id: req.userId }],
      },
      order: ['created_at'],
    });

    return res.json(transaction);
  }

  async show(req, res) {
    const transaction = await Transaction.findByPk(req.params.id);

    return res.json(transaction);
  }
}

export default new TransactionsController();
