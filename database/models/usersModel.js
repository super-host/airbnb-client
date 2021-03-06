module.exports = {
  fields: {
    id: {
      type: 'text',
      default: { '$db_function': 'uuid()' },
    },
    username: 'text',
    is_host: {
      type: 'boolean',
      default: false,
    },
    superhost_status: {
      type: 'boolean',
      default: false,
    },
    updated_at: {
      type: 'timestamp',
      default: { '$db_function': 'toTimestamp(now())' },
    },
  },
  key: [['is_host', 'superhost_status'], 'id'],
  indexes: ['id', 'superhost_status', 'username'],
};
