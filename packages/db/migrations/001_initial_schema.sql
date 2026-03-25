-- ============================================
-- VOYGO — Initial Database Schema
-- Supabase / PostgreSQL
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROFILES (extends Supabase auth.users)
-- =============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  preferred_currency TEXT NOT NULL DEFAULT 'EUR',
  preferred_language TEXT NOT NULL DEFAULT 'fr',
  dietary_type TEXT NOT NULL DEFAULT 'none'
    CHECK (dietary_type IN ('vegetarian','vegan','pescatarian','halal','kosher','gluten_free','lactose_free','none')),
  allergies TEXT[] NOT NULL DEFAULT '{}',
  favorite_cuisines TEXT[] NOT NULL DEFAULT '{}',
  is_premium BOOLEAN NOT NULL DEFAULT FALSE,
  premium_until TIMESTAMPTZ,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_profiles_email ON public.profiles(email);

-- =============================================
-- TRIPS
-- =============================================
CREATE TABLE public.trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  destination_country TEXT NOT NULL DEFAULT '',
  destination_lat DOUBLE PRECISION,
  destination_lng DOUBLE PRECISION,
  cover_image_url TEXT,
  trip_type TEXT NOT NULL DEFAULT 'vacation'
    CHECK (trip_type IN ('weekend','vacation','daytrip','business','roadtrip')),
  status TEXT NOT NULL DEFAULT 'planning'
    CHECK (status IN ('planning','upcoming','ongoing','completed','cancelled')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  budget_target NUMERIC(12,2),
  budget_currency TEXT NOT NULL DEFAULT 'EUR',
  notes TEXT,
  preparation_score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT valid_dates CHECK (end_date >= start_date)
);

CREATE INDEX idx_trips_owner ON public.trips(owner_id);
CREATE INDEX idx_trips_status ON public.trips(status);
CREATE INDEX idx_trips_dates ON public.trips(start_date, end_date);

-- =============================================
-- TRIP MEMBERS
-- =============================================
CREATE TABLE public.trip_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  role TEXT NOT NULL DEFAULT 'editor'
    CHECK (role IN ('owner','editor','viewer')),
  invited_email TEXT,
  invite_token TEXT UNIQUE,
  accepted BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(trip_id, user_id)
);

CREATE INDEX idx_trip_members_trip ON public.trip_members(trip_id);
CREATE INDEX idx_trip_members_user ON public.trip_members(user_id);
CREATE INDEX idx_trip_members_token ON public.trip_members(invite_token);

-- =============================================
-- CHECKLIST ITEMS
-- =============================================
CREATE TABLE public.checklist_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  category TEXT NOT NULL DEFAULT 'before_departure'
    CHECK (category IN ('before_departure','packing','during','after_return')),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','completed','skipped')),
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  due_date DATE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_checklist_trip ON public.checklist_items(trip_id);
CREATE INDEX idx_checklist_status ON public.checklist_items(trip_id, status);

-- =============================================
-- EXPENSES
-- =============================================
CREATE TABLE public.expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
  currency TEXT NOT NULL DEFAULT 'EUR',
  category TEXT NOT NULL DEFAULT 'other'
    CHECK (category IN ('transport','accommodation','food','activities','shopping','insurance','visa','other')),
  paid_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  split_between UUID[] NOT NULL DEFAULT '{}',
  date DATE NOT NULL,
  notes TEXT,
  receipt_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_expenses_trip ON public.expenses(trip_id);
CREATE INDEX idx_expenses_category ON public.expenses(trip_id, category);

-- =============================================
-- BOOKINGS
-- =============================================
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  type TEXT NOT NULL
    CHECK (type IN ('flight','train','bus','car_rental','hotel','apartment','activity')),
  title TEXT NOT NULL,
  provider TEXT,
  confirmation_number TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','confirmed','cancelled')),
  start_datetime TIMESTAMPTZ NOT NULL,
  end_datetime TIMESTAMPTZ,
  location TEXT,
  price NUMERIC(12,2),
  currency TEXT NOT NULL DEFAULT 'EUR',
  booking_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bookings_trip ON public.bookings(trip_id);
CREATE INDEX idx_bookings_type ON public.bookings(trip_id, type);

-- =============================================
-- CALENDAR EVENTS
-- =============================================
CREATE TABLE public.calendar_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_datetime TIMESTAMPTZ NOT NULL,
  end_datetime TIMESTAMPTZ NOT NULL,
  location TEXT,
  color TEXT DEFAULT '#2563EB',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_calendar_events_trip ON public.calendar_events(trip_id);
CREATE INDEX idx_calendar_events_dates ON public.calendar_events(start_datetime, end_datetime);

-- =============================================
-- DESTINATIONS (reference data)
-- =============================================
CREATE TABLE public.destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  country_code TEXT NOT NULL,
  currency TEXT NOT NULL,
  language TEXT NOT NULL,
  timezone TEXT NOT NULL,
  plug_type TEXT,
  visa_info TEXT,
  emergency_number TEXT NOT NULL DEFAULT '112',
  useful_info TEXT,
  image_url TEXT,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL
);

CREATE INDEX idx_destinations_country ON public.destinations(country_code);
CREATE UNIQUE INDEX idx_destinations_name_country ON public.destinations(name, country_code);

-- =============================================
-- RESTAURANTS (curated data)
-- =============================================
CREATE TABLE public.restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination TEXT NOT NULL,
  name TEXT NOT NULL,
  cuisine_type TEXT NOT NULL,
  price_range INTEGER NOT NULL CHECK (price_range BETWEEN 1 AND 4),
  rating NUMERIC(2,1) NOT NULL CHECK (rating BETWEEN 0 AND 5),
  address TEXT NOT NULL,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  phone TEXT,
  website TEXT,
  maps_url TEXT,
  dietary_options TEXT[] NOT NULL DEFAULT '{}',
  allergen_friendly TEXT[] NOT NULL DEFAULT '{}',
  description TEXT,
  image_url TEXT
);

CREATE INDEX idx_restaurants_destination ON public.restaurants(destination);
CREATE INDEX idx_restaurants_cuisine ON public.restaurants(cuisine_type);

-- =============================================
-- USEFUL PHRASES
-- =============================================
CREATE TABLE public.useful_phrases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL,
  category TEXT NOT NULL
    CHECK (category IN ('greeting','restaurant','transport','emergency','shopping','directions','general')),
  original TEXT NOT NULL,
  translated TEXT NOT NULL,
  phonetic TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_phrases_language ON public.useful_phrases(language);
CREATE INDEX idx_phrases_lang_cat ON public.useful_phrases(language, category);

-- =============================================
-- REMINDERS
-- =============================================
CREATE TABLE public.reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT,
  remind_at TIMESTAMPTZ NOT NULL,
  is_sent BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reminders_trip ON public.reminders(trip_id);
CREATE INDEX idx_reminders_pending ON public.reminders(is_sent, remind_at) WHERE NOT is_sent;

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
-- destinations, restaurants, useful_phrases are public read

-- Profiles: users can read/update their own
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Trips: owners and members can access
CREATE POLICY "Trip members can view trips"
  ON public.trips FOR SELECT
  USING (
    owner_id = auth.uid()
    OR id IN (SELECT trip_id FROM public.trip_members WHERE user_id = auth.uid() AND accepted = TRUE)
  );

CREATE POLICY "Users can create trips"
  ON public.trips FOR INSERT
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Trip owners can update"
  ON public.trips FOR UPDATE
  USING (owner_id = auth.uid());

CREATE POLICY "Trip owners can delete"
  ON public.trips FOR DELETE
  USING (owner_id = auth.uid());

-- Trip members: trip owners and members can view
CREATE POLICY "Members can view trip members"
  ON public.trip_members FOR SELECT
  USING (
    trip_id IN (
      SELECT id FROM public.trips WHERE owner_id = auth.uid()
      UNION
      SELECT trip_id FROM public.trip_members WHERE user_id = auth.uid() AND accepted = TRUE
    )
  );

CREATE POLICY "Trip owners can manage members"
  ON public.trip_members FOR ALL
  USING (
    trip_id IN (SELECT id FROM public.trips WHERE owner_id = auth.uid())
  );

-- Checklist, expenses, bookings, calendar_events, reminders: trip members can access
CREATE POLICY "Trip members can manage checklist"
  ON public.checklist_items FOR ALL
  USING (
    trip_id IN (
      SELECT id FROM public.trips WHERE owner_id = auth.uid()
      UNION
      SELECT trip_id FROM public.trip_members WHERE user_id = auth.uid() AND accepted = TRUE
    )
  );

CREATE POLICY "Trip members can manage expenses"
  ON public.expenses FOR ALL
  USING (
    trip_id IN (
      SELECT id FROM public.trips WHERE owner_id = auth.uid()
      UNION
      SELECT trip_id FROM public.trip_members WHERE user_id = auth.uid() AND accepted = TRUE
    )
  );

CREATE POLICY "Trip members can manage bookings"
  ON public.bookings FOR ALL
  USING (
    trip_id IN (
      SELECT id FROM public.trips WHERE owner_id = auth.uid()
      UNION
      SELECT trip_id FROM public.trip_members WHERE user_id = auth.uid() AND accepted = TRUE
    )
  );

CREATE POLICY "Trip members can manage calendar events"
  ON public.calendar_events FOR ALL
  USING (
    trip_id IN (
      SELECT id FROM public.trips WHERE owner_id = auth.uid()
      UNION
      SELECT trip_id FROM public.trip_members WHERE user_id = auth.uid() AND accepted = TRUE
    )
  );

CREATE POLICY "Users can manage own reminders"
  ON public.reminders FOR ALL
  USING (user_id = auth.uid());

-- =============================================
-- FUNCTIONS
-- =============================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Auto-add owner as trip member
CREATE OR REPLACE FUNCTION public.handle_new_trip()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.trip_members (trip_id, user_id, role, accepted)
  VALUES (NEW.id, NEW.owner_id, 'owner', TRUE);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_trip_created
  AFTER INSERT ON public.trips
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_trip();

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON public.trips
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_checklist_items_updated_at BEFORE UPDATE ON public.checklist_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
