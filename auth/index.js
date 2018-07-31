const { json, send } = require('micro');
const jwt_auth = require('micro-jwt-auth');
const jwt = require('jsonwebtoken');
const request = require('request-promise-native');
const User = require('./user_model');


module.exports = jwt_auth(process.env.JWT_SECRET, ['/register', '/login'])
(async(req, res) => {
  switch(req.url) {
    case '/register': return await register(req);
    case '/login'   : return await login(req);
    default: return `Recognized as ${req.jwt.email}`;
  }
});

async function register(req) {
  const body = await json(req);
  console.log(body['g-recaptcha-response']);

  //Validate captcha first
  const captcha_url = 'https://www.google.com/recaptcha/api/siteverify' +
    '?secret=' + process.env.CAPTCHA_SECRET_KEY +
    '&response=' + body['g-recaptcha-response'];

  const captcha_response = await request({
      method: 'POST',
      uri: captcha_url,
      json: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
  });

  if(!captcha_response.success) {
    throw new Error('reCAPTCHA check failed');
  }

  await User.create({ email: body.email, password: body.password });
  return login(body);
}

async function login(req) {
  const body = await json(req);

  const user = await User.findOne({ email: body.email }, '+password');

  if(!user) {
    throw new Error('User not found');
  }

  if(!user.comparePassword(body.password)) {
    throw new Error('Incorrect Password');
  }

  const { password, ...payload } = user.toObject();

  return jwt.sign(payload, process.env.JWT_SECRET);
}
