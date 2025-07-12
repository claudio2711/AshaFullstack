export interface Time {
  minute: number;
  second: number;
}

export interface TimeState {
  currentTime: Time;
  totalTime:  Time;
}
