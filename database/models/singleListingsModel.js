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
    max_guests: 'int',
    room_type: 'text',
    bedrooms: 'int',
    bathrooms: 'float',
    beds: 'int',
    overall_rating: 'float',
    accomodation_type: 'text',
    user_id: 'text',
    updated_at: 'text',
    blackout_dates: {
      type: 'list',
      typeDef: '<text>',
    },
  },
  key: ['id'],
};
