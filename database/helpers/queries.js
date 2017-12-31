module.exports = {
  addAllUsers: (userObj) => {
    const { id, username, is_host, superhost_status } = userObj;
    let updated_at = userObj.updated_at;
    updated_at = JSON.parse(updated_at.replace('T', ' '));
    return `INSERT INTO listing.users (id, username, is_host, superhost_status, updated_at) VALUES (${id}, '${username}', ${is_host}, ${superhost_status}, '${updated_at}');`;
  },
  addSingleUser: (userObj) => {
    const { id, username, is_host, superhost_status } = userObj;
    let updated_at = userObj.updated_at;
    updated_at = JSON.parse(updated_at.replace('T', ' '));
    return `INSERT INTO listing.singleUser (id, username, is_host, superhost_status, updated_at) VALUES (${id}, '${username}', ${is_host}, ${superhost_status}, '${updated_at}');`;
  },
  findUser: (id) => {
    return new Promise((resolve, reject) => {
      `SELECT * FROM listing.singleUser WHERE is_host = TRUE AND id = ${id};`
    });
  },
  addAnyListing: (listingObj) => {
    const { id, location, title, description, price, max_guests, room_type, bedrooms, bathrooms, beds, overall_rating, accomodation_type, user_id, blackout_dates } = listingObj;
    let updated_at = listingObj.updated_at;
    updated_at = JSON.parse(updated_at.replace('T', ' '));
    return `INSERT INTO listing.anyListings (id, location, title, description, price, max_guests, room_type, bedrooms, bathrooms, beds, overall_rating, accomodation_type, user_id, blackout_dates, updated_at) VALUES (${id}, '${location}', '${title}', '${description}', ${price}, ${max_guests}, '${room_type}', ${bedrooms}, ${bathrooms}, ${beds}, ${overall_rating}, '${accomodation_type}', ${user_id}, ['${blackout_dates}'], '${updated_at}');`;
  },
  addListing: (listingObj) => {
    const { id, location, title, description, price, max_guests, room_type, bedrooms, bathrooms, beds, overall_rating, accomodation_type, user_id, blackout_dates } = listingObj;
    let updated_at = listingObj.updated_at;
    updated_at = JSON.parse(updated_at.replace('T', ' '));
    return `INSERT INTO listing.listings (id, location, title, description, price, max_guests, room_type, bedrooms, bathrooms, beds, overall_rating, accomodation_type, user_id, blackout_dates, updated_at) VALUES (${id}, '${location}', '${title}', '${description}', ${price}, ${max_guests}, '${room_type}', ${bedrooms}, ${bathrooms}, ${beds}, ${overall_rating}, '${accomodation_type}', ${user_id}, ['${blackout_dates}'], '${updated_at}');`;
  },
  addLocationListings: (listingObj) => {
    const { id, location, title, description, price, max_guests, room_type, bedrooms, bathrooms, beds, overall_rating, accomodation_type, user_id, blackout_dates } = listingObj;
    let updated_at = listingObj.updated_at;
    updated_at = JSON.parse(updated_at.replace('T', ' '));
    return `INSERT INTO listing.location (id, location, title, description, price, max_guests, room_type, bedrooms, bathrooms, beds, overall_rating, accomodation_type, user_id, blackout_dates, updated_at) VALUES (${id}, '${location}', '${title}', '${description}', ${price}, ${max_guests}, '${room_type}', ${bedrooms}, ${bathrooms}, ${beds}, ${overall_rating}, '${accomodation_type}', ${user_id}, ['${blackout_dates}'], '${updated_at}');`;
  },
  findListing: (location, accomodation_type, beds, listing_id) => {
    return `SELECT * FROM listing.listings WHERE location = ${location} AND accomodation_type = ${accomodation_type} AND beds = ${beds} AND id = ${listing_id};`;
  },
  search: (location, priceMin = 0, priceMax, accomodation_type, beds) => {
    // check args length
    // if args length is 0
    // run query with anywhere table in singlelistings model
    // overall rating is 3, filter by gte 3
    // else if args length is 1
    // check each arg and search according to MV in singlelistings model
    // else find listings matching criteria
    // if (arguments.length === 0) {
    //   models.instance.singleListings.find()
    // } else if (arguments.length === 1) {
    //   models.instance.singleListings.find()
    // } else {
    return `SELECT * FROM listing.location WHERE WHERE location = ${location} AND accomodation_type = ${accomodation_type} AND beds = ${beds} AND price > ${priceMin} AND price < ${priceMax};`;
  }
};
