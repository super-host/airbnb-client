module.exports = {
  fields: {
    id: {
      type: 'uuid',
      default: { $db_function: 'uuid()' },
    },
    location: 'text',
    title: 'text',
    description: 'text',
    price: 'int',
    maxGuests: 'int',
    roomType: 'text',
    bedrooms: 'int',
    bathrooms: 'int',
    beds: 'int',
    overallRating: 'float',
    accomodationType: 'text',
    hostID: 'uuid',
    updatedAt: {
      type: 'timestamp',
      default: { $db_function: 'toTimestamp(now())' },
    },
    availabilityPreferences: {
      type: 'map',
      typeDef: '<timestamp, text>',
    },
  },
  key: [['location', 'accomodationType'], 'price', 'beds'],
  indexes: ['id', 'price'],
};
