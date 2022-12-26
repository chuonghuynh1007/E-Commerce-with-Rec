var ctrl = module.exports;
const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const passport = require('passport');

ctrl.register = async (req, res) => {
  const { name, email, password, phone, gender, confirm} = req.body;
  console.log("Backend");
  if (!name || !email || !password || !confirm) {
    res.json({success: false, data:"Fill empty fields"});
  }
  //Confirm Passwords
  if (password !== confirm) {
    res.json({success: false, data:"Password must match"});
  } else {
    //Validation
    User.findOne({ email: email }).then((user) => {
      if (user) {
        res.json({success: false, data:"Email existed"});
      } else {
        //Validation
        const newUser = new User({
          name, email, password, phone, gender,
        });
        //Password Hashing
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(res.json({success: true, data:"Success signin!"}))
              .catch((err) => console.log(err));
          })
        );
      }
    }).catch((error) => {
      console.log(error);
      throw(error);
    });
  }
}

ctrl.login = (req, res) => {
  const { email, password } = req.body;
  //Required
  if (!email || !password) {
    res.json({success: false, data: "Please fill in all the fields!"});
  } else {
    User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            res.json({success: false, data: "Wrong email!"});
          }
          //Match Password
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {
              res.json({success: true, data: "Login success!"});
            } else {
              res.json({success: false, data: "Wrong password!"});
            }
          });
        }).catch((error) => {
          console.log(error);
          throw(error);
        });
  }
};
