const express = require('express');
const axios = require('axios');


const app = express();
const PORT = 4000;

app.use(express.json());
app.use(require("cors")())

app.get('/authenticate/:code', async (req, res) => {
  try {
    const { code } = req.params;
    console.log(code);
    // Replace with your own GitHub app credentials
    const clientId = 'YOUR-CLIENT-ID';
    const clientSecret = 'YOUR-CLIENT-STRUCTURE';

    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: clientId,
      client_secret: clientSecret,
      code: code
    }, {
      headers: {
        Accept: 'application/json'
      }
    });
    const { access_token } = response.data;
    console.log(response.data);
    res.json({ token: access_token });
  } catch (error) {
    console.error('Error generating GitHub token:', error.message);
    res.status(500).json({ error: 'Failed to generate GitHub token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
