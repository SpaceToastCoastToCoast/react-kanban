let userValidate = (req, res, next) => {
  if ( /[{}<>;]/g.test(req.body.password) ||
    req.body.password === undefined ||
    /[<>?":{}|!@$%^&*()_\-+,./\];\\=]/g.test(req.body.username) ||
    req.body.username === undefined) {
      res.status(400).json({error: 'invalid input'});
  } else {
    next();
  }
};

module.exports = {userValidate};