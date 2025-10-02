// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const querystring = require('querystring');

const app = express();
const port = 8888;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.use(cors());

// Step 1: Redirect user to Spotify's authorization page
app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email user-top-read';
  res.redirect(`https://accounts.spotify.com/authorize?` +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
    }));
});

// Step 2: Handle the callback from Spotify
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
    });

    const { access_token, refresh_token } = response.data;

    // For this simple phase, we'll pass the tokens back to the frontend
    // via query parameters. In a real app, you'd use a more secure method.
    res.redirect(`http://localhost:3000?access_token=${access_token}&refresh_token=${refresh_token}`);

  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});