
import { Anuncios } from './Anuncios/index.js';
import { Scheduler } from './Scheduler/index.js';
import { options } from './utils/index.js';

const scheduler = new Scheduler(options.ROOMS);
const anuncios = new Anuncios({...options, scheduler});

anuncios.runBot();