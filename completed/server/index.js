const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));



app.listen(8321, () => {
  console.log('================================');
  console.log(`     server is on 8321`);
  console.log('================================');
});
