export interface Schedules {
  key: string;
  schedule: {
    start(): void;
    stop(): void;
  };
}
