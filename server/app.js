const dotenv = require('dotenv'); // 설정파일
dotenv.config();
const express = require('express');
const app = express();
const connect = require('./db');
const cors = require('cors');
const morgan = require('morgan');
const port = 3000;
const dayRouter = require('./routes/day');
const googleRouter = require('./routes/google_auth');

connect();

app.use(morgan('dev'));
app.use(cors());
app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', [dayRouter, googleRouter]);

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/seoul');
const createdAt = moment().format('HH:mm');
console.log('현재 시각은 ' + createdAt + ' 입니다.');

app.get('/', (req, res) => {
  res.send('실전 파이널 서버');
});
app.listen(port, () => {
  console.log(port, '포트가 켜졌습니다.');
});
