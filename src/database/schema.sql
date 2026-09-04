CREATE TABLE
  users (
    id serial primary key,
    username text NOT NULL UNIQUE,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    email text NOT NULL UNIQUE,
    "passwordHash" text NOT NULL,
    "birthDate" date NOT NULL,
    "createdAt" timestamptz DEFAULT now () NOT NULL,
    "updatedAt" timestamptz DEFAULT now () NOT NULL
  );

create table
  venue (
    id serial primary key,
    "venueName" text NOT NULL,
    "venueAddress" text NOT NULL,
    "openingTime" time NOT NULL,
    "closingTime" time NOT NULL,
    capacity int NOT NULL CHECK (capacity >= 0),
    "createdAt" timestamptz DEFAULT now () NOT NULL,
    "updatedAt" timestamptz DEFAULT now () NOT NULL
  );

create table
  events (
    id serial primary key,
    "venueId" integer REFERENCES venue (id) ON DELETE RESTRICT NOT NULL,
    "eventName" text NOT NULL,
    "artistName" text NOT NULL,
    "minAge" int CHECK ("minAge" >= 0) NOT NULL,
    "startingTime" time NOT NULL,
    "eventDate" date NOT NULL,
    "minTicketPrice" int CHECK ("minTicketPrice" >= 0) NOT NULL,
    "maxTicketPrice" int CHECK ("maxTicketPrice" >= "minTicketPrice") NOT NULL,
    "createdAt" timestamptz DEFAULT now () NOT NULL,
    "updatedAt" timestamptz DEFAULT now () NOT NULL
  );

create table
  "ticketCategory" (
    id serial primary key,
    "eventId" integer REFERENCES events (id) ON DELETE RESTRICT NOT NULL,
    "ticketName" text NOT NULL,
    price int CHECK (price >= 0) NOT NULL,
    "totalAmount" int CHECK ("totalAmount" >= 0) NOT NULL,
    available int CHECK (
      available >= 0
      AND available <= "totalAmount"
    ) NOT NULL,
    "createdAt" timestamptz DEFAULT now () NOT NULL,
    "updatedAt" timestamptz DEFAULT now () NOT NULL
  );

create table
  booking (
    id serial primary key,
    "userId" integer REFERENCES users (id) ON DELETE RESTRICT NOT NULL,
    "eventId" integer REFERENCES events (id) ON DELETE RESTRICT NOT NULL,
    "bookingStatus" text NOT NULL CHECK (
      "bookingStatus" IN ('pending', 'confirmed', 'cancelled', 'expired')
    ),
    "ticketAmount" int CHECK ("ticketAmount" >= 0) NOT NULL,
    "createdAt" timestamptz DEFAULT now () NOT NULL,
    "updatedAt" timestamptz DEFAULT now () NOT NULL
  );

create table
  payment (
    id serial primary key,
    "bookingId" integer REFERENCES booking (id) ON DELETE RESTRICT NOT NULL,
    method text NOT NULL,
    "checkoutAmount" int CHECK ("checkoutAmount" >= 0) NOT NULL,
    "paymentStatus" text NOT NULL CHECK (
      "paymentStatus" IN ('pending', 'succeeded', 'failed')
    ),
    "createdAt" timestamptz DEFAULT now () NOT NULL,
    "updatedAt" timestamptz DEFAULT now () NOT NULL
  );

create table
  ticket (
    id serial primary key,
    "bookingId" integer REFERENCES booking (id) ON DELETE RESTRICT NOT NULL,
    "ticketCategoryId" integer REFERENCES "ticketCategory" (id) ON DELETE RESTRICT NOT NULL,
    "qrCode" text NOT NULL UNIQUE,
    "ticketStatus" text NOT NULL CHECK ("ticketStatus" IN ('valid', 'used', 'cancelled')),
    "createdAt" timestamptz DEFAULT now () NOT NULL,
    "updatedAt" timestamptz DEFAULT now () NOT NULL
  );