import User from '../models/User';
import Balance from '../models/Balance';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { cpf: req.body.cpf } });

    if (userExists) {
      return res.status(400).json({ error: 'CPF already exists.' });
    }

    const emailAlreadyExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (emailAlreadyExists) {
      return res.status(400).json({ error: 'E-mail already exists.' });
    }

    const usernameAlreadyExists = await User.findOne({
      where: { username: req.body.username },
    });
    if (usernameAlreadyExists) {
      return res.status(400).json({ error: 'Username already exists.' });
    }

    const phoneAlreadyExists = await User.findOne({
      where: { phone: req.body.phone },
    });
    if (phoneAlreadyExists) {
      return res.status(400).json({ error: 'Phone already exists.' });
    }

    const {
      id,
      username,
      email,
      name,
      birthdate,
      cpf,
      phone,
    } = await User.create(req.body);

    await Balance.create({
      amount: 0,
      last_transaction_id: 0,
      id: id,
    });

    return res.json({
      id,
      username,
      email,
      name,
      birthdate,
      cpf,
      phone,
    });
  }

  async update(req, res) {
    const { username, email, phone, oldPassword, name } = req.body;
    console.log(req.body);

    const user = await User.findByPk(req.userId);

    if (email != user.email) {
      const userAlreadyUse = await User.findOne({
        where: { email },
      });

      if (userAlreadyUse) {
        return res.status(400).json({ error: 'Email already exists.' });
      }
    }

    if (username != user.username) {
      const userAlreadyUse = await User.findOne({
        where: { username },
      });

      if (userAlreadyUse) {
        return res.status(400).json({ error: 'Username already exists.' });
      }
    }
    if (phone != user.phone) {
      const userAlreadyUse = await User.findOne({
        where: { phone },
      });

      if (userAlreadyUse) {
        return res.status(400).json({ error: 'Phone already used.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, cpf } = await user.update(req.body);

    return res.json({
      id,
      username,
      email,
      name,
      cpf,
      phone,
    });
  }

  async showId(req, res) {
    const { id, username, name, birthdate } = await User.findByPk(
      req.params.id
    );

    return res.json({ id, username, name, birthdate });
  }

  async showUser(req, res) {
    const userFounded = await User.findOne({
      where: { username: req.params.username },
    });
    if (!userFounded) {
      return res.status(401).json({ error: 'User does not exists.' });
    }

    const { id, username, name, birthdate } = userFounded;

    return res.json({ id, username, name, birthdate });
  }
}

export default new UserController();
