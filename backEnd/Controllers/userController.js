const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const { username, email, birthday, plan } = req.body;
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      birthday,
      plan,
    });
    res.send(newUser);
  } catch (err) {
    res.status(404).json({ message: "didnt create user" });
  }
};

exports.handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
      .populate("events")
      .populate({
        path: "exercises",
        populate: { path: "workouts" },
      })
      .exec();
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 380000,
        sameSite: "strict",
      });
      res.send({
        _id: user._id,
        username: user.username,
        email: user.email,
        birthday: user.birthday,
        password: user.password,
        plan: user.plan,
        token: token,
        events: user.events,
        exercises: user.exercises,
        classes: user.classes,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.handleLogOut = (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.editUser = async (req, res) => {
  const { username, password, email, birthday } = req.body;

  try {
    const currentUser = await User.findById(req.params.id);
    if (!currentUser) {
      return res.status(404).json({ error: "User not found." });
    }

    const currentHashedPassword = currentUser.password;

    let hashedPassword = currentHashedPassword;

    if (password && password !== currentHashedPassword) {
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const updatedFields = {
      username,
      password: hashedPassword,
      email,
      birthday,
    };

    const editedUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      updatedFields,
      { new: true }
    );

    if (editedUser) {
      res.json(editedUser);
    } else {
      res.status(400).json({ error: "Failed to update user." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

// exports.addPlan = async (req, res) => {
//   try {
//     const userWithPlan = {  };
//     const updatedUser = await User.findByIdAndUpdate(req.body.id, userWithPlan);
//     res.status(200).send(updatedUser);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send({ message: "Internal Server Error" });
//   }
// };

exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken._id)
      .populate("classes")
      .populate("events")
      .populate({
        path: "exercises",
        populate: { path: "workouts" },
      })
      .exec();
    req.user = user;
    next();
  } catch (e) {}
};

exports.fetchUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .populate("classes")
      .populate("events")
      .populate({
        path: "exercises",
        populate: { path: "workouts" },
      })
      .exec();
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
