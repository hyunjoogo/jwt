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



app.listen(process.env.PORT, () => {
  console.log('================================');
  console.log(`     server is on ${process.env.PORT}`);
  console.log('================================');
});
