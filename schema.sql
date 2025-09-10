-- SQL schema para Supabase
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  display_name text,
  phone text,
  role text DEFAULT 'user',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE plans (
  id serial PRIMARY KEY,
  stripe_price_id text UNIQUE,
  name text,
  details jsonb,
  price integer
);

CREATE TABLE listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner uuid REFERENCES auth.users NOT NULL,
  titulo text,
  descripcion text,
  tipo text,
  categoria text,
  moneda text,
  precio_raw numeric,
  ciudad text,
  colonia text,
  m2 integer,
  rec integer,
  ban integer,
  parking integer,
  imagenes jsonb,
  lat numeric,
  lng numeric,
  is_active boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE transactions (
  id serial PRIMARY KEY,
  user_id uuid REFERENCES auth.users,
  listing_id uuid REFERENCES listings,
  stripe_session_id text,
  stripe_payment_intent text,
  amount integer,
  currency text,
  status text,
  created_at timestamptz DEFAULT now()
);
