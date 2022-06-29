const express = require('express');
const router = express.Router();

// 날짜 API

router.get('/day', (req, res) => {
  const day_box = ['2022-06-02','2022-06-02','2022-06-02', '2022-06-12','2022-06-12','2022-06-12', '2022-06-08'];
  res.send(day_box);
});

module.exports = router;
