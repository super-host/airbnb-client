module.exports = {
  // create keyspace
  buildKeyspace:
  `CREATE KEYSPACE IF NOT EXISTS listing WITH REPLICATION = { 
    'class' : 'SimpleStrategy',
    'replication_factor' : 3 };`,

  useKeyspace:
  `USE listing;`,

  // any listing
  buildListings:
  `CREATE TABLE IF NOT EXISTS anyListings (
    id uuid,
    location text,
    title text,
    description text,
    price int,
    max_guests int,
    room_type text,
    bedrooms int,
    bathrooms float,
    beds int,
    overall_rating float,
    accomodation_type text,
    user_id uuid,
    updated_at timestamp,
    blackout_dates list<text>,
    PRIMARY KEY (overall_rating, id)
  );`,

  // listing with all criteria
  buildAllCriteria:
  `CREATE TABLE IF NOT EXISTS listings (
    id uuid,
    location text,
    title text,
    description text,
    price int,
    max_guests int,
    room_type text,
    bedrooms int,
    bathrooms float,
    beds int,
    overall_rating float,
    accomodation_type text,
    user_id uuid,
    updated_at timestamp,
    blackout_dates list<text>,
    PRIMARY KEY (location, accomodation_type, beds, price, id)
  );`,

  indexListingPrice:
  `CREATE INDEX IF NOT EXISTS ON listings (price);`,

  indexListingAcc:
  `CREATE INDEX IF NOT EXISTS ON listings (accomodation_type);`,

  indexListingBed:
  `CREATE INDEX IF NOT EXISTS ON listings (beds);`,

  // listing with location only
  // materialized views for location + other attribute
  buildLocation:
  `CREATE TABLE IF NOT EXISTS location (
    id uuid,
    location text,
    title text,
    description text,
    price int,
    max_guests int,
    room_type text,
    bedrooms int,
    bathrooms float,
    beds int,
    overall_rating float,
    accomodation_type text,
    user_id uuid,
    updated_at timestamp,
    blackout_dates list<text>,
    PRIMARY KEY (location, id)
  );`,
  
  indexLocationPrice:
  `CREATE INDEX IF NOT EXISTS ON location (price);`,

  indexLocationAcc:
  `CREATE INDEX IF NOT EXISTS ON location (accomodation_type);`,

  indexLocationBed:
  `CREATE INDEX IF NOT EXISTS ON location (beds);`,

  // users
  buildUsers:
  `CREATE TABLE IF NOT EXISTS users (
    id uuid,
    username text,
    is_host boolean,
    superhost_status boolean,
    updated_at timestamp,
    PRIMARY KEY (is_host, superhost_status, id)
  );`,

  indexUserId:
  `CREATE INDEX IF NOT EXISTS ON users (id);`,
 
  indexUserSH:
  `CREATE INDEX IF NOT EXISTS ON users (superhost_status);`,

  indexUserName:
  `CREATE INDEX IF NOT EXISTS ON users (username);`,

  // single user
  buildSingleUser:
  `CREATE TABLE IF NOT EXISTS singleUser (
    id uuid,
    username text,
    is_host boolean,
    superhost_status boolean,
    updated_at timestamp,
    PRIMARY KEY (is_host, id)
  );`,

  indexSingleUserId:
  `CREATE INDEX IF NOT EXISTS ON singleUser (id);`,
};
