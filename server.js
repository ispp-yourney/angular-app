const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/yourney-angular-app'));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/yourney-angular-app/index.html'));
});

app.listen(process.env.PORT || 5000);