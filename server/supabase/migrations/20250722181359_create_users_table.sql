create table public.users (
  user_id uuid primary key default gen_random_uuid(),

  user_name varchar(50) not null,
  full_name varchar(100),
  first_name varchar(50),
  last_name varchar(50),

  phone varchar(15) not null check (phone ~ '^[0-9]{10,15}$'),
  city varchar(50),
  state varchar(50),
  pincode varchar(10) check (pincode ~ '^[0-9]{4,10}$'),

  email varchar(100) not null unique,
  password text not null,

  age smallint check (age >= 0 and age <= 120),
  status varchar(20) default 'active',
  
  role_type varchar(10) not null default 'user' check (role_type in ('user', 'admin')),
  is_active boolean default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
