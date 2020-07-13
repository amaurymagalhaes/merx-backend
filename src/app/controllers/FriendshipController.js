import User from '../models/User';
import Friendship from '../models/Friendship';

class FriendshipController {
  async store(req, res) {
    const user1 = await User.findByPk(req.body.user_id_1);
    const user2 = await User.findByPk(req.body.user_id_2);

    if (!user1) {
      return res.status(400).json({ error: 'User 1 does not exists.' });
    }
    if (!user2) {
      return res.status(400).json({ error: 'User 2 does not exists.' });
    }

    const friendship = await Friendship.create({
      user_id_1: req.body.user_id_1,
      user_id_2: req.body.user_id_2,
    });

    return res.status(200).json('Amizade criada com sucesso.');
  }

  async delete(req, res) {
    const friendship_id = await Friendship.destroy({
      where: { id: req.params.id },
    });

    return res.json('Amizade desfeita com sucesso.');
  }

  async show(req, res) {
    const friendship = await Friendship.findByPk(req.params.id);

    return res.json(friendship);
  }
}

export default new FriendshipController();
