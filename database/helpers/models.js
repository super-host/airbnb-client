module.exports = {
  // any listing
  buildListings:
  `CREATE TABLE IF NOT EXISTS listing.anyListings (
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
    overall_rating float PRIMARY KEY,
    accomodation_type text,
    user_id uuid,
    updated_at timestamp,
    blackout_dates list<text>
  );`,

  // listing with all criteria
  buildAllCriteria:
  `CREATE TABLE IF NOT EXISTS listing.listings (
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
    PRIMARY KEY (location, accomodation_type, beds, price)
  );
  
  CREATE INDEX ON listing.listings (id);
  CREATE INDEX ON listing.listings (price);
  CREATE INDEX ON listing.listings (accomodation_type);
  CREATE INDEX ON listing.listings (beds);`,

  // listing with location only
  // materialized views for location + other attribute
  buildLocation:
  `CREATE TABLE IF NOT EXISTS listing.location (
    id uuid,
    location text PRIMARY KEY,
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
    blackout_dates list<text>
  );
  
  CREATE INDEX ON listing.listings (price);
  CREATE INDEX ON listing.listings (accomodation_type);
  CREATE INDEX ON listing.listings (beds);`,

  // users
  buildUsers:
  `CREATE TABLE IF NOT EXISTS listing.users (
    id uuid,
    username text,
    is_host boolean,
    superhost_status boolean,
    updated_at timestamp,
    PRIMARY KEY (is_host, superhost_status)
  );

  CREATE INDEX ON listing.users (id);
  CREATE INDEX ON listing.users (superhost_status);
  CREATE INDEX ON listing.users (username);`,

  // single user
  buildSingleUser:
  `CREATE TABLE IF NOT EXISTS listing.users (
    id uuid,
    username text,
    is_host boolean PRIMARY KEY,
    superhost_status boolean,
    updated_at timestamp
  );
  
  CREATE INDEX ON listing.users (id);`,
};
