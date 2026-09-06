create table
  users (
    id serial primary key,
    username text not null unique,
    "firstName" text not null,
    "lastName" text not null,
    email text not null unique,
    "passwordHash" text not null,
    "birthDate" date not null,
    "createdAt" timestamptz default now () not null,
    "updatedAt" timestamptz default now () not null
  );

create table
  venue (
    id serial primary key,
    "venueName" text not null,
    "venueAddress" text not null,
    "openingTime" time not null,
    "closingTime" time not null,
    capacity int not null check (capacity >= 0),
    "createdAt" timestamptz default now () not null,
    "updatedAt" timestamptz default now () not null
  );

create table
  events (
    id serial primary key,
    "venueId" integer not null,
    constraint fk_venue foreign key ("venueId") references venue (id) on delete RESTRICT,
    "eventName" text not null,
    "artistName" text not null,
    "minAge" int check ("minAge" >= 0) not null,
    "startingTime" time not null,
    "eventDate" date not null,
    "minTicketPrice" int check ("minTicketPrice" >= 0) not null,
    "maxTicketPrice" int check ("maxTicketPrice" >= "minTicketPrice") not null,
    "createdAt" timestamptz default now () not null,
    "updatedAt" timestamptz default now () not null
  );

create table
  "ticketCategory" (
    id serial primary key,
    "eventId" integer not null,
    constraint fk_events foreign key ("eventId") references events (id) on delete RESTRICT,
    "ticketName" text not null,
    price int check (price >= 0) not null,
    "totalAmount" int check ("totalAmount" >= 0) not null,
    available int check (
      available >= 0
      AND available <= "totalAmount"
    ) not null,
    "createdAt" timestamptz default now () not null,
    "updatedAt" timestamptz default now () not null
  );

create table
  booking (
    id serial primary key,
    "userId" integer not null,
    constraint fk_users foreign key ("userId") references users (id) on delete RESTRICT,
    "eventId" integer not null,
    constraint fk_events foreign key ("eventId") references events (id) on delete RESTRICT,
    "bookingStatus" text not null check (
      "bookingStatus" in ('pending', 'confirmed', 'cancelled', 'expired')
    ),
    "ticketAmount" int check ("ticketAmount" >= 0) not null,
    "createdAt" timestamptz default now () not null,
    "updatedAt" timestamptz default now () not null
  );

create table
  payment (
    id serial primary key,
    "bookingId" integer not null,
    constraint fk_booking foreign key ("bookingId") references booking (id) on delete RESTRICT,
    method text not null,
    "checkoutAmount" int check ("checkoutAmount" >= 0) not null,
    "paymentStatus" text not null check (
      "paymentStatus" in ('pending', 'succeeded', 'failed')
    ),
    "createdAt" timestamptz default now () not null,
    "updatedAt" timestamptz default now () not null
  );

create table
  ticket (
    id serial primary key,
    "bookingId" integer not null,
    constraint fk_booking foreign key ("bookingId") references booking (id) on delete RESTRICT,
    "ticketCategoryId" integer not null,
    constraint fk_ticketCategory foreign key ("ticketCategoryId") references "ticketCategory" (id) on delete RESTRICT,
    "qrCode" text not null unique,
    "ticketStatus" text not null check ("ticketStatus" in ('valid', 'used', 'cancelled')),
    "createdAt" timestamptz default now () not null,
    "updatedAt" timestamptz default now () not null
  );