import mapImg from "../assets/mapImg.png";

export interface ICourse {
  name: string;
  code: string;
  period: string;
  startDate: string;
  finishDate: string;
  subjects: TSubjects[];
  mapImg: string;
}

export type TSubjects = {
  name: string;
  code: string;
  color: string;
  professor: {
    name: string;
    email: string;
    office: string;
  };
  //   grades: {};
  activities: {
    title: string;
    totalMarks: number;
    gotMarks: number;
    location: "Quizzes" | "Submissions" | "Content" | "Outro";
    description: string;
    openingDate: string; // dia e hora
    closingDate: string; // dia e hora
  }[];
  classes:
    | {
        building: string;
        room: string;
        startTime: string;
        endTime: string;
        weekDay: string;
      }[]
    | "online";
};

export const course: ICourse = {
  name: "Computer Programming and Analysis",
  code: "CPA3",
  period: "26F",
  startDate: "2026-09-09",
  finishDate: "2026-12-11",
  mapImg,
  subjects: [
    {
      name: "Database Fundamentals",
      code: "INFO1215-01",
      color: "text-[#38bdf8]",
      professor: {
        name: "Bestan Maaroof",
        email: "b_maaroof@fanshaweonline.ca",
        office: "G3001",
      },
      activities: [],
      classes: [
        {
          building: "T",
          room: "1003",
          startTime: "14:30",
          endTime: "16:30",
          weekDay: "monday",
        },
        {
          building: "M",
          room: "3045",
          startTime: "13:00",
          endTime: "15:00",
          weekDay: "tuesday",
        },
      ],
    },
    {
      name: "Operating Systems Fundamentals for Programmers",
      code: "INFO1216-01",
      color: "text-[#34d399]",
      professor: {
        name: "Michael Feeney",
        email: "mfeeney@fanshawec.ca",
        office: "G3001",
      },
      activities: [],
      classes: [
        {
          building: "R1",
          room: "1019",
          startTime: "16:30",
          endTime: "19:30",
          weekDay: "monday",
        },
      ],
    },
    {
      name: "Programming Fundamentals",
      code: "INFO1214-01",
      color: "text-[#fbbf24]",
      professor: {
        name: "Tony Haworth",
        email: "thaworth@fanshaweonline.ca",
        office: "G3001",
      },
      activities: [],
      classes: [
        {
          building: "R1",
          room: "1019",
          startTime: "15:00",
          endTime: "17:00",
          weekDay: "tuesday",
        },
        {
          building: "M",
          room: "3039",
          startTime: "18:00",
          endTime: "20:00",
          weekDay: "wednesday",
        },
        {
          building: "M",
          room: "3039",
          startTime: "8:00",
          endTime: "10:00",
          weekDay: "friday",
        },
      ],
    },
    {
      name: "Reason & Writing",
      code: "WRIT-1034-56",
      color: "text-[#c084fc]",
      professor: {
        name: "Divya",
        email: "d_divya157691@fanshaweonline.ca",
        office: "A2058",
      },
      activities: [],
      classes: [
        {
          building: "L",
          room: "4022",
          startTime: "15:00",
          endTime: "18:00",
          weekDay: "wednesday",
        },
      ],
    },
    {
      name: "Mathematics for Programmers",
      code: "MATH-1202-01",
      color: "text-[#fb7185]",
      professor: {
        name: "Luigi Sorbara",
        email: "lsorbara@fanshawec.ca",
        office: "???",
      },
      activities: [],
      classes: [
        {
          building: "M",
          room: "3047",
          startTime: "09:00",
          endTime: "12:00",
          weekDay: "thursday",
        },
      ],
    },
    {
      name: "Strategies for Success",
      code: "BUSI-1156-01",
      color: "text-[#2dd4bf]",
      professor: {
        name: "Sunil Godse",
        email: "sgodse@fanshaweonline.ca",
        office: "G3001/Virtual",
      },
      activities: [],
      classes: "online",
    },
  ],
};
