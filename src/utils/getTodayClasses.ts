import { course, type TSubjects } from "../constants/course";

export interface TodayClassItem {
  subjectName: string;
  subjectCode: string;
  subjectColor: string;
  building: string;
  room: string;
  startTime: string;
  endTime: string;
  professor: TSubjects["professor"];
  activities: TSubjects["activities"];
}

export const getTodayClasses = (): TodayClassItem[] => {
  const daysMap: Record<number, string> = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
  };

  const todayIndex = new Date().getDay();
  const currentWeekDay = daysMap[todayIndex];

  const todayClasses: TodayClassItem[] = [];

  course.subjects.forEach((subject) => {
    if (subject.classes !== "online" && Array.isArray(subject.classes)) {
      subject.classes.forEach((cls) => {
        if (cls.weekDay.toLowerCase() === currentWeekDay) {
          todayClasses.push({
            subjectName: subject.name,
            subjectCode: subject.code,
            subjectColor: subject.color,
            building: cls.building,
            room: cls.room,
            startTime: cls.startTime,
            endTime: cls.endTime,
            professor: subject.professor,
            activities: subject.activities,
          });
        }
      });
    }
  });

  return todayClasses.sort((a, b) => a.startTime.localeCompare(b.startTime));
};
