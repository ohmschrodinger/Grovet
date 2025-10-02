# 🎧 Grovet

*Grovet* is a collaborative music web app built on Spotify. Create a Crew with friends, explore your shared music tastes, and build playlists together

## 🛠 Features (MVP)

- 🔐 Login with Spotify (OAuth 2.0)
- 👥 Create or join a Crew via invite link
- 🎶 See common top artists ("Venn of Vibes")
- 📻 Start a Jam Session with a shared playlist
- ➕ All members can search and add songs in real time

## 📦 Tech Stack

- **Frontend**: React
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Auth**: Spotify OAuth 2.0
- **Real-Time**: Socket.IO (for future sync)

## 🧪 Local Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/ohmschrodinger/grovet.git
   cd grovet
   ```
2. Install dependencies:

   ```bash
   # Frontend
   cd client && npm install

   # Backend
   cd ../server && npm install
   ```
3. Set up your `.env` in `/server`:

   ```env
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   REDIRECT_URI=http://localhost:8888/callback
   SESSION_SECRET=your_secret
   DATABASE_URL=your_db_url
   ```
4. Run the app:

   ```bash
   # Backend
   npm run dev

   # Frontend (in /client)
   npm start
   ```
