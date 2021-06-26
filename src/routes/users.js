const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const config = require('config');
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { name, email, gender, age, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    user = new User({
      name,
      email,
      gender,
      age,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/update/fields', auth, async (req, res) => {
  const { name, email, gender, age } = req.body;

  //Update user fields
  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (gender) userFields.gender = gender;
  if (age) userFields.age = age;
  //   if (password) userFields.password = password;

  //   if (userFields.password !== '') {

  //   }

  try {
    const user = await User.findById(req.user.id);

    if (user) {
      updatedUser = await User.findByIdAndUpdate(
        { _id: req.user.id },
        { $set: userFields },
        { new: true }
      );

      return res.json(updatedUser);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/update/password', auth, async (req, res) => {
  const { password, newPassword } = req.body;

  let updatedPassword = newPassword;

  try {
    const user = await User.findById(req.user.id);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const salt = await bcrypt.genSalt(10);
        updatedPassword = await bcrypt.hash(newPassword, salt);
        updatedUser = await User.findByIdAndUpdate(
          { _id: req.user.id },
          { $set: { password: updatedPassword } },
          { new: true }
        );

        return res.json(updatedUser);
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
