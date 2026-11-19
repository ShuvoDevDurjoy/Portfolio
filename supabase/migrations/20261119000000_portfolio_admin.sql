create table if not exists public.portfolio_sections (
  section text primary key check (
    section in (
      'profile',
      'social_links',
      'competitive_stats',
      'about',
      'projects',
      'blogs',
      'skills',
      'experience',
      'education',
      'achievements',
      'certificates',
      'courses'
    )
  ),
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_sections enable row level security;

revoke insert, update, delete on public.portfolio_sections from anon, authenticated;
grant select on public.portfolio_sections to anon, authenticated;

drop policy if exists "Public can read portfolio sections" on public.portfolio_sections;
create policy "Public can read portfolio sections"
  on public.portfolio_sections
  for select
  to anon, authenticated
  using (true);

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'portfolio-media',
  'portfolio-media',
  true,
  104857600,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read portfolio media" on storage.objects;
create policy "Public can read portfolio media"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'portfolio-media');
