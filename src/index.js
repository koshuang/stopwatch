import 'normalize.css/normalize.css';
import './styles/index.scss';
import { StopWatch } from './modules/stopwatch';

const stopwatch = new StopWatch();
stopwatch.run();

window.stopwatch = stopwatch;
