module.exports = {
  fields: {
    id: {
      type: 'text',
      default: { '$db_function': 'uuid()' },
    },
    username: 'text',
    isHost: {
      type: 'boolean',
      default: false,
    },
    superhostStatus: {
      type: 'boolean',
      default: false,
    },
    updatedAt: {
      type: 'timestamp',
      default: { '$db_function': 'toTimestamp(now())' },
    },
  },
  key: ['id', 'superhostStatus'],
  indexes: ['username'],
};
