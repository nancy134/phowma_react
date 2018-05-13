// in my-app/server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs');
console.log("got here");
app.get('/', function(request, response){
  console.log('Home page visited! '+request.hostname+request.baseUrl+JSON.stringify(request.query));
  const filePath = path.resolve(__dirname, './build', 'index.html');

  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$PAGE_TITLE/g, 'Home');
    data = data.replace(/\$PAGE_DESCRIPTION/g, 'Information for voters');
    data = data.replace(/\$TWITTER_HANDLE/g, '@voterinfo777');
    data = data.replace(/\$TWITTER_IMAGE/g, 'http://server.phowma.com/Representative800x800.jpg');
    data = data.replace(/\$PAGE_URL/g, 'http://server.phowma.com/');
    result = data.replace(/\$SITE_NAME/g, 'Voter Information');

    response.send(result);
  });
});
app.get('/findmyrep', function(request, response){
  console.log('findmyrep visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');

  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$PAGE_TITLE/g, 'Who is my representative?');
    data = data.replace(/\$PAGE_DESCRIPTION/g, 'Find out who your representative is.');
    data = data.replace(/\$TWITTER_HANDLE/g, '@voterinfo777');
    data = data.replace(/\$TWITTER_IMAGE/g, 'http://server.phowma.com/Representative_2_600.jpg');
    data = data.replace(/\$PAGE_URL/g, 'http://server.phowma.com/findmyrep');
    result = data.replace(/\$SITE_NAME/g, 'Voter Information');

    response.send(result);
  });
});

app.get('/district/*', function(request, response){
  console.log('district visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');

  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$PAGE_TITLE/g, 'Who is my representative?');
    data = data.replace(/\$PAGE_DESCRIPTION/g, 'Find out who your representative is.');
    data = data.replace(/\$TWITTER_HANDLE/g, '@voterinfo777');
    data = data.replace(/\$TWITTER_IMAGE/g, 'http://server.phowma.com/Representative_2_600.jpg');
    data = data.replace(/\$PAGE_URL/g, 'http://server.phowma.com/findmyrep');
    result = data.replace(/\$SITE_NAME/g, 'Voter Information');

    response.send(result);
  });
});

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', function(request, response) {
  console.log("app.get(*) "+request.hostname+request.baseUrl+JSON.stringify(request.query));
  const filePath = path.resolve(__dirname, 'build', 'index.html');
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
