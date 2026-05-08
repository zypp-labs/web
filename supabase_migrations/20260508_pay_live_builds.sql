-- Migration: create Zypp Pay live build distribution table
-- Run in Supabase SQL Editor.

-- Needed for gen_random_uuid() in newer Postgres setups
create extension if not exists pgcrypto;

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

-- Exactly one latest build per platform (as requested)
create unique index if not exists pay_live_builds_latest_unique
  on public.pay_live_builds(platform)
  where is_latest = true;

-- Helpful lookup indexes
create index if not exists pay_live_builds_platform_release_date_idx
  on public.pay_live_builds(platform, release_date desc);

-- Optional but recommended hardening: allow public reads via RLS policy
alter table public.pay_live_builds enable row level security;

drop policy if exists "Public read pay live builds" on public.pay_live_builds;
create policy "Public read pay live builds"
  on public.pay_live_builds
  for select
  using (true);

