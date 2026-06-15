# Supabase

## Setup
1. Create a project at https://supabase.com
2. Copy the Project URL and anon key from Settings -> API
3. Paste them into `frontend/.env.local`

## Schema
All SQL migrations live in `migrations/`. Run them in order in the Supabase SQL editor.

## Edge Functions
Server-side logic that cannot run in the browser goes in `functions/`.
Examples: webhooks, sending emails, calling paid APIs with secret keys.

## Local development (optional)
Install the CLI: https://supabase.com/docs/guides/cli
    supabase init
    supabase start
