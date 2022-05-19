import express from 'express';
import SunCalc from 'suncalc';

const app = express();
const port = 3000;


app.get('/', (req, res) => {

  SunCalc.addTime(-18, 'dawnAstronomical', 'duskAstronomical');
  SunCalc.addTime(-12, 'dawnNautical', 'duskNautical');
  SunCalc.addTime(-6, 'dawnCivil', 'duskCivil');

  const times = SunCalc.getTimes(new Date(), 51.5, -0.116);

  res.send(times);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
