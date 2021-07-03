export interface ParkingScheduleItem {
  startHour: [number, number], endHour: [number, number], active: boolean  
}

export type ParkingScheduleWeeklyEntries = [
  ParkingScheduleItem,
  ParkingScheduleItem,
  ParkingScheduleItem,
  ParkingScheduleItem,
  ParkingScheduleItem,
  ParkingScheduleItem,
  ParkingScheduleItem
];

export type ParkingSchedule = {
  id: string,
  schedule: ParkingScheduleWeeklyEntries
};

