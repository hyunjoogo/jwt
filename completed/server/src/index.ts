import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { login, accessToken, refreshToken, loginSuccess, logout } from './controller';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.post('/login', login);
app.get('/accesstoken', accessToken);
app.get('/refreshtoken', refreshToken);
app.get('/login/success', loginSuccess);
app.post('/logout', logout);


app.listen(3123, () => {
  console.log('================================');
  console.log(`     server is on 3123`);
  console.log('================================');
});
