// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  // get a single user by email
  async getOneUser({ user = null, params }, res) {
    const foundUser = await User.findOne({ where: { email: user ? user.email : params.email } });

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this email!' });
    }

    res.json(foundUser);
  },
  // get all users
  async getUsers(res) {
    const allUsers = await User.findAll();
    
    if (!allUsers) {
      return res.status(400).json({ message: 'No users in the database.' });
    }

    res.json(allUsers);
  },
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  async createUser({ body }, res) {
    const user = await User.create({ email: body.email, password: body.password });

    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
  async login({ body }, res) {
    const user = await User.findOne({ where: { email: body.email } });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
  // forgot password if params.code, else set code for forgot password
  async updateUser({ body, params }, res) {
    if (!params.code) {
      try {
        await User.update(
          { reset_token: body.code },
          { where: { email: body.email } }
        );
        return res.json({ message: 'Code applied.'});
      } catch (err) {
        return res.status(400).json({ message: 'Email does not exist. Please create an account.'})
      }
    }

    const user = await User.findOne({ where: { email: body.email } });
    if (!user) {
      return res.status(400).json({ message: "Email does not exist. Please create an account." });
    }

    if (user.reset_token && user.reset_token == params.code) {
      try {
        await user.update({ password: body.password, reset_token: null });
        return res.json(user);
      } catch (err) {
        return res.status(400).json({ message: 'An error occurred while saving your password.' });
      }
    }

    res.status(400).json({ message: 'Confirmation code does not exist, please try again.'});
  },
  // only super users can promote other super users, or no super users exist yet
  async promoteUser({ body }, res) {
    const superUsers = await User.findAll({ where: { isSuper: true } });
    if (superUsers) {
      const promoter = await User.findOne({ where: { email: body.promoter }});
      if (!promoter) {
        return res.status(400).json({ message: `${body.promoter} is not a valid email.`});
      }
      if (!promoter.isSuper) {
        return res.status(400).json({ message: 'Insufficient privileges.'});
      }
      const correctPw = await promoter.isCorrectPassword(body.password);
      if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
      }
    }
    try {
      await User.update(
        { isSuper: true },
        { where: { email: body.promotee }}
      );
      res.json({ message: `${body.promotee} is now a super user.`});
    } catch (err) {
      res.status(400).json({ message: `${body.promotee} is not a valid email.`});
    }
  },
  // async deleteUser({ user = null, params }, res) {
  //   const foundUser = await User.findOne({
  //     email: user ? user.email : params.email
  //   });

  //   if (!foundUser) {
  //     return res.status(400).json({ message: 'Cannot find a user with this email!' });
  //   }

  //   res.json(foundUser);
  // },
};
