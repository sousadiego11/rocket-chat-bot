import { Scheduler } from '../../Scheduler';

export interface Options {
  HOST: string,
	USER: string,
	PASS: string,
	BOTNAME: string,
	SSL: boolean,
	ROOMS: string[],
  scheduler?: Scheduler
}
