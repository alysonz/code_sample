const bread = require('./bread');

const fields = [
  'id',
  'user_id',
  'first_name',
  'last_name',
  'primary_language',
  'birth_date',
];

module.exports = function personalInfoRead(req) {
  const filter = {
    user_id: req.params.user_id,
  };

  return bread.read('personal_info', fields, filter);
};
