import express from 'express';
import SunCalc from 'suncalc';
import { DateTime } from "luxon";
import { get } from 'lodash';

const app = express();
const port = 3000;

app.get('/', (req, res) => {

  SunCalc.addTime(-18, 'astronomicalDawn', 'astrologicalDusk');
  SunCalc.addTime(-6, 'civilDawn', 'civilDusk');

  const times = SunCalc.getTimes(new Date(), 51.51, -0.057);

  const rval = {
    astronomicalDawn: DateTime.fromJSDate(get(times, 'astronomicalDawn')).plus({ hours: 1 }).toLocaleString(DateTime.TIME_24_SIMPLE),
    nauticalDawn: DateTime.fromJSDate(times.nauticalDawn, 'civiDawn').plus({ hours: 1 }).toLocaleString(DateTime.TIME_24_SIMPLE),
    civilDawn: DateTime.fromJSDate(get(times, 'civilDawn')).plus({ hours: 1 }).toLocaleString(DateTime.TIME_24_SIMPLE),
    sunrise: DateTime.fromJSDate(times.sunrise).plus({ hours: 1 }).toLocaleString(DateTime.TIME_24_SIMPLE),
    noon: DateTime.fromJSDate(times.solarNoon).plus({ hours: 1 }).toLocaleString(DateTime.TIME_24_SIMPLE),
    sunset: DateTime.fromJSDate(times.sunset).plus({ hours: 1 }).toLocaleString(DateTime.TIME_24_SIMPLE),
    civilDusk: DateTime.fromJSDate(get(times, 'civilDusk')).plus({ hours: 1 }).toLocaleString(DateTime.TIME_24_SIMPLE),
    nauticalDusk: DateTime.fromJSDate(times.nauticalDusk).plus({ hours: 1 }).toLocaleString(DateTime.TIME_24_SIMPLE),
    astrologicalDusk: DateTime.fromJSDate(get(times, 'astrologicalDusk')).plus({ hours: 1 }).toLocaleString(DateTime.TIME_24_SIMPLE),
    nadir: DateTime.fromJSDate(times.nadir).plus({ hours: 1 }).toLocaleString(DateTime.TIME_24_SIMPLE),
  }

  res.send(rval);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
