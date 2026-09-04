create
or replace function update_timestamp_column () returns trigger as $$ begin new.updatedAt = now ();

return new;

end;

$$ language plpgsql;

create trigger users_updated_at before
update on users for each row execute function update_timestamp_column ();

create trigger venue_updated_at before
update on venue for each row execute function update_timestamp_column ();

create trigger events_updated_at before
update on events for each row execute function update_timestamp_column ();

create trigger ticket_category_updated_at before
update on "ticketCategory" for each row execute function update_timestamp_column ();

create trigger booking_updated_at before
update on booking for each row execute function update_timestamp_column ();

create trigger payment_updated_at before
update on payment for each row execute function update_timestamp_column ();

create trigger ticket_updated_at before
update on ticket for each row execute function update_timestamp_column ();