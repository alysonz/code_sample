const { omitBy, isUndefined } = require('lodash');

const bread = require('./bread');

const fields = [
  'id',
  'user_id',
  'first_name',
  'last_name',
  'primary_language',
  'birth_date',
];

module.exports = async function personalInfoAdd(req) {
  const { payload, params } = req;
  const data = omitBy({
    user_id: params.user_id,
    first_name: payload.first_name,
    last_name: payload.last_name,
    primary_language: payload.primary_language,
    birth_date: payload.birth_date,
  }, isUndefined);

  return bread.add('personal_info', fields, data);
};
