# Blog App 📝

This repository is a full-stack **blog** app built with PostgreSQL, Express, React + Vite, and Node. Users are loaded from the database on the home screen; you pick an account to “sign in” (client-side only. New users can be created using cURL or Postman). You can browse posts, open a single post, filter the list by search, and create new posts for the selected user via a form. On a post’s detail page, **Listen with Google Cloud Text-to-Speech** turns the post body into spoken audio (MP3) via the backend. Each post row shows the **author’s display name** (from the API’s `author` field). **Author links** in the UI are placeholders: clicking them shows a “coming soon” message rather than opening a profile. Optional post fields include `description`, `tags` (comma-separated in the form), and the schema supports `image`. Creating an account from the UI and a real author profile page are not implemented yet.

![Demo gif](./frontend/public/demo.gif)

## Project Stack

- **`frontend/`** — React + Vite app (package name `frontend`), UI with React Bootstrap and React Router
- **`backend/`** — Node.js + Express API + PostgreSQL (`pg`), CORS enabled for the browser, plus **Google Cloud Text-to-Speech** for the post “Play Audio” action

## Google Cloud Text-to-Speech

The backend exposes **`POST /api/text-to-speech`**, which accepts JSON `{ "text": "..." }` and returns **MP3** audio. The React post detail page calls this endpoint so readers can hear the post body read aloud.

### One-time Google Cloud setup

1. In [Google Cloud Console](https://console.cloud.google.com/), create or select a project.
2. Enable the **[Cloud Text-to-Speech API](https://console.cloud.google.com/apis/library/texttospeech.googleapis.com)** for that project.
3. Create a **service account** (IAM & Admin → Service accounts). For typical short-form synthesis, enabling the API and using that account’s key is enough; if your organization locks down APIs, add any IAM bindings your admin requires for calling **Cloud Text-to-Speech**.
4. Open the service account → **Keys** → **Add key** → **JSON** and download the key file. Store it **outside** the repo (and never commit it).

### Wire credentials with `backend/.env.example`

1. From the **`backend`** directory, copy the example env file and edit the copy:

   ```bash
   cd backend
   cp .env.example .env
   ```

2. Set **`GOOGLE_APPLICATION_CREDENTIALS`** in **`backend/.env`** to the **absolute path** of the downloaded JSON key, for example:

   ```text
   GOOGLE_APPLICATION_CREDENTIALS=/Users/you/keys/my-blog-tts-sa.json
   ```

   The [`@google-cloud/text-to-speech`](https://www.npmjs.com/package/@google-cloud/text-to-speech) client reads this variable automatically (see also [Application Default Credentials](https://cloud.google.com/docs/authentication/application-default-credentials)).

3. Keep **`PORT`** and **`DATABASE_URL`** filled in as documented below, then start the backend with `npm run dev`.

If this variable is missing or the key is invalid, **Play Audio** on a post will fail and the API returns an error.

## How to install frontend

1. `cd frontend`
2. `npm install`
3. Copy `.env.example` to `.env` and set **`VITE_API_URL`** to the backend API base including **`/api`** (for example `http://127.0.0.1:3000/api` if the server uses port **3000**).
4. `npm run dev` (or `npx vite`)
5. Open [http://localhost:5173](http://localhost:5173) in the browser.

Ensure the backend is running and reachable at the URL you configured (see [API routes](#api-routes)).

## How to install backend + API

1. `cd backend`
2. `npm install`
3. Copy **`backend/.env.example`** to **`backend/.env`** and set `PORT`, **`DATABASE_URL`**, and (for Text-to-Speech) **`GOOGLE_APPLICATION_CREDENTIALS`** (see [Database setup](#database-setup) and [Google Cloud Text-to-Speech](#google-cloud-text-to-speech)).
4. `npm run dev` (nodemon). The server listens on **`127.0.0.1`** and the port from `PORT` (default **3000** in `.env.example`).

## Database setup

1. Check that PostgreSQL is running.
2. Create an empty database for the app (example name: `blogdb`).
3. From the **`backend`** directory, load the schema and seed data (use the database name you created in step 2):

   ```bash
   cd backend
   psql -d your_database -f src/db/db.sql
   ```

   If `psql` errors on `\restrict` / `\unrestrict` lines (some `pg_dump` formats), remove those lines from `src/db/db.sql` or load a dump compatible with your PostgreSQL client, then ensure tables and seed rows match the app’s expectations.

4. In **`backend/.env`**, set `DATABASE_URL` to the connection string—for example:

   ```text
   DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/your_database
   PORT=3000
   ```

5. Start the backend with `npm run dev`. If the database is unreachable, the process exits on startup.

## API routes

Base URL (local): `http://127.0.0.1:3000` (or your `PORT`). JSON API routes are mounted under **`/api`**.

There is **no** authentication layer: all endpoints are open. The frontend simulates login by choosing a user from **`GET /api/users`**.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Server and PostgreSQL connectivity (not under `/api`). |
| `GET` | `/api/users` | All users. |
| `GET` | `/api/users/:id` | One user by numeric `id`. |
| `POST` | `/api/users` | Create user. Body: `{ "first_name", "last_name", "email", "password" }`. Names must be at least **2** characters; **`email`** must contain `@`; **`password`** must be longer than **12** characters. **Note:** the password is stored **as provided** (no hashing in the API). |
| `PUT` | `/api/users/:id` | Update profile. Body: `{ "first_name", "last_name", "email" }`. Same validation as create (except password). |
| `DELETE` | `/api/users/:id` | Delete user (posts cascade per foreign key). |
| `GET` | `/api/posts` | All posts, each row includes an **`author`** string (`first_name` + space + `last_name`). Ordered by `created_at` descending. |
| `GET` | `/api/posts/:id` | One post by id, includes **`author`**. |
| `POST` | `/api/posts` | Create post. Body: `{ "user_id", "title", "text", "description", "tags" }`. **`user_id`** must be numeric; **`title`** and **`text`** are required. `tags` may be a PostgreSQL text array (e.g. `["books","sci-fi"]`). |
| `PUT` | `/api/posts/:id` | Full update. Body: `{ "user_id", "title", "text", "description", "tags" }`. Updates only if the row matches both **`id`** and **`user_id`**. |
| `DELETE` | `/api/posts/:id` | Delete post. Body: `{ "user_id" }` (numeric). Deletes only if the row matches **`id`** and **`user_id`**. |
| `POST` | `/api/text-to-speech` | Synthesize speech. Body: `{ "text": "..." }`. Returns **MP3** (`audio/mpeg`). Requires **`GOOGLE_APPLICATION_CREDENTIALS`** in `backend/.env` (see [Google Cloud Text-to-Speech](#google-cloud-text-to-speech)). |

CORS is enabled for browser clients.

## How to test

**Backend (automated)**

- `cd backend` — `npm test` is currently a placeholder (no suite added yet).

**Frontend (automated)**

- Testing coming soon.

**Backend (manual)**

1. Health check:

   ```bash
   curl -s http://127.0.0.1:3000/health
   ```

2. List users and posts:

   ```bash
   curl -s http://127.0.0.1:3000/api/users
   ```

   ```bash
   curl -s http://127.0.0.1:3000/api/posts
   ```

3. Create a post (use a real `user_id` from your DB):

   ```bash
   curl -s -X POST http://127.0.0.1:3000/api/posts \
     -H "Content-Type: application/json" \
     -d '{"user_id":1,"title":"Hello","text":"Body text","description":"Short","tags":["demo"]}'
   ```

**Frontend**

- Run the dev server and exercise the UI at `http://localhost:5173`.

## How to use the app

1. **Choose a user** — On `/`, pick an email and click **Select**. The app stores that user in React state and navigates to `/posts`. This is not a secure login; it is for demo and development.
2. **Posts** — Browse `/posts`, search when logged in (navbar), open a post at `/posts/:id`, or add a post at `/new-post/:userId` (the `userId` in the URL should match your selected user’s id for a consistent experience). On a post page, use **Play Audio** to hear the post body via Google Cloud Text-to-Speech (backend must have valid GCP credentials). Author names appear on cards and on the post page; do not expect author profile navigation until that route is built.
3. **API parity** — Create/update/delete users and posts through the REST API as needed; the UI covers listing, viewing, and creating posts only (no in-app edit/delete for posts or full account management).

**Example `GET /api/posts` response shape** (array of rows; `author` is added by the query):

```json
[
  {
    "id": "1",
    "title": "Top 10 Sci-Fi Must Reads",
    "description": "A countdown of the best science fiction books of the decade.",
    "text": "…",
    "tags": ["books", "sci-fi", "top 10"],
    "image": null,
    "user_id": "1",
    "created_at": "2026-04-07T04:11:11.670Z",
    "updated_at": "2026-04-07T04:11:11.670Z",
    "author": "Dari Cares"
  }
]
```

### Use of AI

This README was generated with AI assistance, using a README template from a different project as structural guidance and filling in details from this repository’s source files.
