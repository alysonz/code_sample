const knex = require('../knex');
const debug = require('debug')('bread');

const { throwDatabaseError, throwNotFound } = require('../lib/errors');

const defaultOptions = {
  dateField: 'created_at',
  dbApi: knex,
  limit: 1000,
  offset: 0,
  sortOrder: 'ASC',
};

module.exports = {
  browse(table, fields, filter, options = {}) {
    const dbApi = options.dbApi || defaultOptions.dbApi;
    const limit = options.limit || defaultOptions.limit;
    const offset = options.offset || defaultOptions.offset;
    const dateField = options.dateField || defaultOptions.dateField;
    const sortOrder = options.sortOrder || defaultOptions.sortOrder;

    let query = dbApi(table)
      .where(filter)
      .select(fields)
      .limit(limit)
      .offset(offset);

    if (options.search_start_date && options.search_end_date) {
      query = query
        .whereBetween(dateField, [options.search_start_date, options.search_end_date]);
    }

    if (options.whereRaw && (options.whereRaw.length === 2)) {
      query = query
        .whereRaw(options.whereRaw[0], options.whereRaw[1]);
    }

    if (options.orderBy) {
      query = query
        .orderBy(options.orderBy, sortOrder);
    }
    if (options.transaction) {
      query = query
        .transacting(options.transaction);
    }

    return query
      .catch((err) => {
        debug(err);
        return throwDatabaseError(err);
      })
      .then((rows) => {
        return rows;
      });
  },
  read(table, fields, filter, options = {}) {
    const dbApi = options.dbApi || knex;

    let query = dbApi(table)
      .where(filter)
      .select(fields);

    if (options.transaction) {
      query = query.transacting(options.transaction);
    }

    return query
      .catch((err) => {
        debug(err);
        return throwDatabaseError(err);
      })
      .then(([row]) => {
        if (row) {
          return row;
        }
        return throwNotFound();
      });
  },
  add(table, fields, data, options = {}) {
    const dbApi = options.dbApi || knex;
    let query = dbApi(table)
      .returning(fields)
      .insert(data);

    if (options.transaction) {
      query = query.transacting(options.transaction);
    }

    return query
      .catch((err) => {
        debug(err);
        return throwDatabaseError(err);
      })
      .then(([row]) => {
        return row;
      });
  },
  edit(table, fields, data, filter, options = {}) {
    const dbApi = options.dbApi || knex;
    let query = dbApi(table)
      .where(filter)
      .returning(fields)
      .update(data);

    if (options.transaction) {
      query = query.transacting(options.transaction);
    }

    return query
      .catch((err) => {
        debug(err);
        return throwDatabaseError(err);
      })
      .then(([row]) => {
        if (row) {
          return row;
        }
        return throwNotFound();
      });
  },
  del(table, filter, options = {}) {
    const dbApi = options.dbApi || knex;

    let query = dbApi(table)
      .where(filter)
      .del();


    if (options.transaction) {
      query = query.transacting(options.transaction);
    }

    return query
      .catch((err) => {
        debug(err);
        return throwDatabaseError(err);
      })
      .then((row) => {
        if (row === 0) {
          return throwNotFound();
        }
        return row;
      });
  },
  rawQuery(query, queryArgs = {}, options = {}) {
    const dbApi = options.dbApi || knex;

    return dbApi.raw(query, queryArgs)
      .then(({ rows }) => {
        return rows;
      })
      .catch((err) => {
        debug(err);
        return throwDatabaseError(err);
      });
  }
};
