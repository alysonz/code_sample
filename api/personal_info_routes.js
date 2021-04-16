const Joi = require('@hapi/joi');
const { omit } = require('lodash');

const read = require('./personal_info_read');
const add = require('./personal_info_add');

const personal_info = {
  id: Joi.number(),
  user_id: Joi.string().guid(),
  first_name: Joi.string().allow(''),
  last_name: Joi.string().allow(''),
  primary_language: Joi.string().allow(''),
  birth_date: Joi.date().allow(null),
};

module.exports = [
  {
    method: 'GET',
    path: '/users/{user_id}/personal_info',
    handler: read,
    config: {
      auth: {
        strategy: 'auth',
      },
      description: 'Retrieve Personal Info',
      notes: 'Retrieves Personal Info By ID',
      tags: ['api', 'personal_info'],
      validate: {
        params: Joi.object({
          user_id: Joi.string().guid().required()
        }),
        query: Joi.object(omit(personal_info, ['id', 'user_id'])),
      },
      response: {
        schema: Joi.object().keys(personal_info)
      }
    },
  },
  {
    method: 'POST',
    path: '/users/{user_id}/personal_info',
    handler: add,
    config: {
      auth: {
        strategy: 'auth',
      },
      description: 'Add personal information about the user to the database.',
      tags: ['api', 'personal_info'],
      validate: {
        params: Joi.object({
          user_id: Joi.string().guid().required()
        }),
        payload: Joi.object(omit(personal_info, ['id', 'user_id'])),
      },
      response: {
        schema: Joi.object().keys(personal_info)
      }
    },
  },
];
