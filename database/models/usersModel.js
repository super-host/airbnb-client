module.exports = {
  fields: {
    id: {
      type: 'uuid',
      default: { '$db_function': 'uuid()' },
    },
    username: 'text',
    superhostStatus: {
      type: 'boolean',
      default: false,
    },
    updatedAt: {
      type: 'timestamp',
      default: { '$db_function': 'toTimestamp(now())' },
    },
  },
  key: ['superhostStatus'],
  indexes: ['id'],
};
