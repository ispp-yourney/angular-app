const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('./dist/yourney-angular-app'));
app.get('*', (req, res) => {
  res.sendFile(path.join('./dist/yourney-angular-app/index.html'));
});

app.listen(process.env.PORT || 5000);