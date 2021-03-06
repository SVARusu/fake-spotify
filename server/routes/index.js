var express = require('express');
var router = express.Router();


var SpotifyWebApi = require('spotify-web-api-node');
scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private']

require('dotenv').config();

var spotifyApi = new SpotifyWebApi({
  clientId: "c92fef0383cc46ddb5ae7714dbe82ade",
  clientSecret: "30c04e75fb0340c5b9b4a8ad6e9acc79",
  redirectUri: "http://localhost:4200/",
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req,res) => {
  var html = spotifyApi.createAuthorizeURL(scopes)
  console.log(html)
  res.send({
    accessUrl: html+"&show_dialog=true"
  });
})

router.get('/callback', async (req,res) => {
  const { code } = req.query;
  console.log(code);
  try {
    var data = await spotifyApi.authorizationCodeGrant(code)
    const { access_token, refresh_token } = data.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);
    res.send({access_token, refresh_token});
    // res.redirect('http://localhost:3001/home');
  } catch(err) {
    res.redirect('/#/error/invalid token');
  }
});

router.get('/userinfo', async (req,res) => {
    try {
      var result = await spotifyApi.getMe();
      console.log(result.body);
      res.status(200).send(result.body)
    } catch (err) {
      res.status(400).send(err)
    }
});

router.get('/playlists', async (req,res) => {
  try {
    var result = await spotifyApi.getUserPlaylists();
    console.log(result.body);
    res.status(200).send(result.body);
  } catch (err) {
    res.status(400).send(err)
  }

});

router.get('/refresh', async (req, res) => {
  try {
    let result = await spotifyApi.refreshAccessToken();
    res.status(200).send(result.body);
  } catch (err) {
    res.status(400).send(err);
  }
})


module.exports = router;
