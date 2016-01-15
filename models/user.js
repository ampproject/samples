var USERS = {};
USERS['subscriber@example.com'] = {
  email: 'subscriber@example.com',
  password: '123456',
  subscriber: true
};

// Create a new user
exports.create = function(email, password, subscriber) {
  USERS[email] = {
    email: email,
    password: password,
    subscriber: subscriber
  };
}

// Get a particular comment
exports.findByEmail = function(email) {
  return USERS[email];
}
