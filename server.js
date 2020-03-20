const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

//bodyparser middleware
app.use(bodyparser.json());

//DB config
const db = require('./config/keys').mongoURI;

//Connect to MONGO

mongoose
   .connect(db)
   .then(() => console.log('MongoDB connected...'))
   .catch(err => console.log(err)); 

//Use routes
app.use('/api/items', items);

//Serve Static assets if we are in production
if(process.env.NODE_ENV === 'production'){
   //set static folder
   app.use(express.static('client/build'));

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
   });
}

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));