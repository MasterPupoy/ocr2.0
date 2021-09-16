const express = require('express');
const app = express();
const cors = require('cors');
const appRoutes = require('./route/route');
const path =require('path')
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/file', express.static(path.join(__dirname,'uploads')));
app.use(express.static(__dirname + '/public'));

app.use('/', appRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
}) 