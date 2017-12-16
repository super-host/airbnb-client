module.exports = {
  fields: {
    id: {
      type: 'text',
      default: { $db_function: 'uuid()' },
    },
    location: 'text',
    title: 'text',
    description: 'text',
    price: 'int',
    maxGuests: 'int',
    roomType: 'text',
    bedrooms: 'int',
    bathrooms: 'float',
    beds: 'int',
    overallRating: 'float',
    accomodationType: 'text',
    userId: 'text',
    updatedAt: {
      type: 'date',
      default: { $db_function: 'toDate(timestamp)' },
    },
    blackoutDates: {
      type: 'list',
      typeDef: '<text>',
    },
  },
  key: [['id', 'location'], 'accomodationType', 'price', 'beds'],
  indexes: ['accomodationType', 'price'],
  // materialized_views: {
  //   main: {
  //     select: ['*'],
  //     key: [['location', 'price'], 'accomodationType'],
  //     filters: {
  //       price: { $gte: new Date('2017-10-10') },
  //     },
  //   },
  // },
};
