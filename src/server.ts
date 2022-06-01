
import { Anuncios } from './Anuncios/';
import { Scheduler } from './Scheduler/';
import { options } from './utils/';

const scheduler = new Scheduler(options.ROOMS);
const anuncios = new Anuncios(options, scheduler);

anuncios.runBot();
