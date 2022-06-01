
import { Bot } from './Bot/';
import { Scheduler } from './Scheduler/';
import { options } from './utils/';

const scheduler = new Scheduler(options.ROOMS);
const bot = new Bot(options, scheduler);

bot.run();
