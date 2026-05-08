# Zypp Pay Live Builds (Supabase) Setup

This repo expects a Supabase table and (for Android) a Storage bucket to power `pay.zypp.fun/live` and the admin “Add Update” flow.

## 1. Create storage bucket (Android APKs)

Create a Supabase Storage bucket named:

- `pay-live-builds` (or set `PAY_LIVE_BINARIES_BUCKET`)

The bucket should be configured for **public reads** so APK URLs work directly in the browser.

## 2. Create the database table

Run the following SQL in the Supabase SQL editor:

```sql
create table if not exists public.pay_live_builds (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform in ('android', 'ios')),
  build_name text not null,
  release_date timestamptz not null,
  url text not null,
  ios_channel text null check (ios_channel in ('testflight', 'expo')),
  checksum text null,
  release_notes text null,
  important_notes text null,
  is_latest boolean not null default false,
  created_at timestamptz not null default now()
);

-- Exactly one latest build per platform
create unique index if not exists pay_live_builds_latest_unique
  on public.pay_live_builds(platform)
  where is_latest = true;
```

## 3. Enable public reads

If you have RLS enabled on the table, add a policy so the public `/api/pay-live-builds` endpoint can read:

```sql
alter table public.pay_live_builds enable row level security;

create policy "Public read pay live builds"
on public.pay_live_builds
for select
using (true);
```

## 4. Admin writes

Admin writes use the server-side Supabase Admin client (`SUPABASE_SERVICE_ROLE_KEY`) when available.

Make sure `.env.local` includes:

- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

After setup, `/admin/live-builds` can add updates and `/pay/live` will reflect changes immediately.