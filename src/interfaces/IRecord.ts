export default interface IRecord {
  recordId: number;
  point: string[];
  recordTime: Date;
  bpSystolic: number;
  bpDiastolic: number;
  bodyTemperature: number;
  heartBeatPerSecond: number;
  dust: number;
  sulphur: number;
  nitrogen: number;
  fluor: number;
  carbonMonoxide: number;
  ozone: number;
  userId: number;
}
