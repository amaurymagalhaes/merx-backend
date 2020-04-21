import Transactions from '../models/Transactions';
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

    const { id, amount, source_id, destiny_id } = await Transactions.create(
      req.body
    );

    async function calculateBalance(
      amount,
      transactionId,
      userSource,
      userDestiny
    ) {
      const BalanceSource = await Balance.findOne({
        where: { id: userSource },
      });
      const BalanceDestiny = await Balance.findOne({
        where: { id: userDestiny },
      });

      BalanceSource.update({
        last_transaction_id: transactionId,
        amount: BalanceSource.amount - amount,
      });
      BalanceDestiny.update({
        last_transaction_id: transactionId,
        amount: BalanceSource.amount + amount,
      });
    }

    calculateBalance(amount, id, source_id, destiny_id);

    return res.json({
      id,
      amount,
      source_id,
      destiny_id,
    });
  }

  async index(req, res) {
    const transactions = await Transactions.findAll({
      where: {
        [Op.or]: [{ destiny_id: req.userId }, { source_id: req.userId }],
      },
      order: ['created_at'],
    });

    return res.json(transactions);
  }

  async show(req, res) {
    const transaction = await Transactions.findByPk(req.params.id);

    return res.json(transaction);
  }
}

export default new TransactionsController();
