export function seedDatabase(db) {
  db.run(seedSql);
}

export const seedSql = `
create table customers (
  id integer primary key,
  name text,
  full_name text,
  city text,
  signup_date text,
  segment text,
  region text,
  email text,
  created_at text
);

insert into customers values
  (1, 'Asha', 'Asha Menon', 'Bengaluru', '2025-08-14', 'Enterprise', 'South', 'asha@example.com', '2025-08-14'),
  (2, 'Rohan', 'Rohan Nair', 'Kochi', '2025-09-02', 'SMB', 'South', 'rohan@example.com', '2025-09-02'),
  (3, 'Meera', 'Meera Shah', 'Mumbai', '2025-10-20', 'Enterprise', 'West', 'meera@example.com', '2025-10-20'),
  (4, 'Arjun', 'Arjun Rao', 'Delhi', '2026-01-11', 'Consumer', 'North', 'arjun@example.com', '2026-01-11'),
  (5, 'Nila', 'Nila Thomas', 'Chennai', '2026-02-15', 'SMB', 'South', 'nila@example.com', '2026-02-15'),
  (6, 'Dev', 'Dev Kapoor', 'Pune', '2026-03-04', 'Enterprise', 'West', 'dev@example.com', '2026-03-04'),
  (7, 'Ira', 'Ira Sen', 'Kolkata', '2026-03-22', 'Consumer', 'East', 'ira@example.com', '2026-03-22'),
  (8, 'Kiran', 'Kiran Das', 'Hyderabad', '2026-04-08', 'SMB', 'South', 'shared@example.com', '2026-04-08'),
  (9, 'Tara', 'Tara Iyer', 'Bengaluru', '2026-05-03', 'Enterprise', 'South', 'shared@example.com', '2026-05-03');

create table orders (
  id integer primary key,
  customer_id integer,
  order_date text,
  total_amount real
);

insert into orders values
  (101, 1, '2026-05-02', 18000),
  (102, 2, '2026-05-04', 9200),
  (103, 3, '2026-05-09', 46500),
  (104, 1, '2026-05-18', 76000),
  (105, 5, '2026-05-22', 12500),
  (106, 6, '2026-06-01', 128000),
  (107, 4, '2026-06-02', 7800),
  (108, 8, '2026-06-03', 15200),
  (109, 9, '2026-06-03', 88500),
  (110, 3, '2026-06-04', 64200);

create table students (
  id integer primary key,
  name text,
  program text
);

insert into students values
  (1, 'Ananya', 'MBA'),
  (2, 'Vikram', 'BCA'),
  (3, 'Sara', 'MBA');

create table attendance (
  id integer primary key,
  student_id integer,
  class_date text,
  status text
);

insert into attendance values
  (1, 1, '2026-06-01', 'present'),
  (2, 2, '2026-06-01', 'absent'),
  (3, 3, '2026-06-01', 'present'),
  (4, 2, '2026-06-02', 'present');

create table shipments (
  id integer primary key,
  shipped_date text,
  delivered_date text,
  delivery_status text,
  shipping_cost real
);

insert into shipments values
  (1, '2026-05-20', '2026-05-25', 'late', 650),
  (2, '2026-05-21', '2026-05-22', 'on_time', 230),
  (3, '2026-05-24', '2026-05-29', 'late', 880),
  (4, '2026-05-26', '2026-05-27', 'on_time', 510);

create table products (
  id integer primary key,
  category text,
  product_name text
);

insert into products values
  (1, 'Electronics', 'Noise Cancelling Headphones'),
  (2, 'Grocery', 'Organic Rice Pack'),
  (3, 'Fashion', 'Linen Shirt'),
  (4, 'Home', 'Smart Lamp'),
  (5, 'Electronics', 'Tablet Pro');

create table order_items (
  id integer primary key,
  order_id integer,
  product_id integer,
  quantity integer,
  line_revenue real
);

insert into order_items values
  (1, 101, 1, 2, 18000),
  (2, 102, 2, 4, 9200),
  (3, 103, 5, 3, 46500),
  (4, 104, 1, 5, 76000),
  (5, 105, 3, 2, 12500),
  (6, 106, 5, 8, 128000),
  (7, 107, 4, 1, 7800),
  (8, 108, 2, 6, 15200),
  (9, 109, 1, 4, 88500),
  (10, 110, 4, 7, 64200);

create table tickets (
  id integer primary key,
  customer_id integer,
  response_minutes integer,
  resolved_at text
);

insert into tickets values
  (1, 1, 18, '2026-05-10'),
  (2, 2, 75, '2026-05-11'),
  (3, 3, 190, '2026-05-12'),
  (4, 4, 33, '2026-05-13');

create table events (
  id integer primary key,
  user_id integer,
  event_date text,
  event_name text
);

insert into events values
  (1, 1, '2026-01-03', 'signup'),
  (2, 1, '2026-01-04', 'trial_started'),
  (3, 1, '2026-01-10', 'purchase'),
  (4, 2, '2026-01-05', 'signup'),
  (5, 2, '2026-01-08', 'trial_started'),
  (6, 3, '2026-02-02', 'signup'),
  (7, 3, '2026-02-05', 'trial_started'),
  (8, 3, '2026-02-14', 'purchase'),
  (9, 4, '2026-02-08', 'signup'),
  (10, 5, '2026-02-09', 'signup'),
  (11, 5, '2026-03-02', 'purchase'),
  (12, 1, '2026-03-07', 'login'),
  (13, 2, '2026-03-08', 'login'),
  (14, 3, '2026-03-09', 'login'),
  (15, 4, '2026-03-10', 'login'),
  (16, 5, '2026-03-11', 'login');

create table enrollments (
  id integer primary key,
  learner_id integer,
  course_id integer
);

insert into enrollments values
  (1, 1, 101),
  (2, 2, 101),
  (3, 3, 101),
  (4, 4, 102),
  (5, 5, 102);

create table course_completions (
  id integer primary key,
  learner_id integer,
  course_id integer,
  completed_at text
);

insert into course_completions values
  (1, 1, 101, '2026-04-10'),
  (2, 3, 101, '2026-04-12'),
  (3, 4, 102, '2026-04-18');

create table users (
  id integer primary key,
  signup_date text,
  segment text
);

insert into users values
  (1, '2026-01-03', 'Enterprise'),
  (2, '2026-01-05', 'SMB'),
  (3, '2026-02-02', 'Enterprise'),
  (4, '2026-02-08', 'Consumer'),
  (5, '2026-02-09', 'SMB');

create table employees (
  id integer primary key,
  department text,
  hire_date text,
  exit_date text
);

insert into employees values
  (1, 'Sales', '2024-01-12', null),
  (2, 'Sales', '2024-02-18', '2026-04-30'),
  (3, 'Engineering', '2023-07-01', null),
  (4, 'Engineering', '2025-01-22', null),
  (5, 'Support', '2024-08-14', '2026-05-15'),
  (6, 'Support', '2025-02-11', null);

create table transactions (
  id integer primary key,
  transaction_date text,
  revenue real,
  cost real
);

insert into transactions values
  (1, '2026-01-15', 120000, 72000),
  (2, '2026-02-15', 142000, 81000),
  (3, '2026-03-15', 156000, 93000),
  (4, '2026-04-15', 149000, 89000);

create table campaigns (
  id integer primary key,
  channel text,
  spend real
);

insert into campaigns values
  (1, 'Search', 24000),
  (2, 'Social', 18000),
  (3, 'Email', 6000),
  (4, 'Events', 32000);

create table conversions (
  id integer primary key,
  campaign_id integer,
  customer_id integer
);

insert into conversions values
  (1, 1, 1),
  (2, 1, 3),
  (3, 1, 6),
  (4, 2, 2),
  (5, 2, 5),
  (6, 3, 8),
  (7, 4, 9);

create table feature_events (
  id integer primary key,
  user_id integer,
  feature_name text,
  event_date text
);

insert into feature_events values
  (1, 1, 'Dashboard', '2026-05-01'),
  (2, 2, 'Dashboard', '2026-05-02'),
  (3, 3, 'Export', '2026-05-03'),
  (4, 1, 'Export', '2026-05-04'),
  (5, 5, 'Alerts', '2026-05-05');

create table workflow_events (
  id integer primary key,
  item_id integer,
  stage text,
  started_at text,
  completed_at text
);

insert into workflow_events values
  (1, 1001, 'Intake', '2026-05-01 09:00:00', '2026-05-01 11:00:00'),
  (2, 1001, 'Review', '2026-05-01 11:30:00', '2026-05-02 14:00:00'),
  (3, 1002, 'Intake', '2026-05-02 09:00:00', '2026-05-02 10:00:00'),
  (4, 1002, 'Review', '2026-05-02 10:30:00', '2026-05-03 17:00:00'),
  (5, 1003, 'Fulfillment', '2026-05-03 09:00:00', '2026-05-03 15:00:00');
`;
