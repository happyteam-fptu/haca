const subjectData = {
  currentYear: 2022,
  currentSemester: 2,
  currentSubjects: [
    {
      subjectName: "MAD101",
      subjectTitle: "Toán rời rạc",
      image: require("../assets/subject-image/MAD101.png"),
      homeworks: [
        {
          id: 1,
          title: "Bài tập 1",
          description: "Bài tập 1",
          deadline: "2021-10-10",
          status: "done",
          subject: "MAD101",
          createdAt: "2021-10-10",
          updatedAt: "2021-10-10",
        },
      ],
    },
    {
      subjectName: "OSG202",
      subjectTitle: "Nhập môn hệ điều hành máy tính",
      image: require("../assets/subject-image/OSG202.png"),
      homeworks: [
        {
          id: 1,
          title: "Bài tập 1",
          description: "Bài tập 1",
          deadline: "2021-10-10",
          status: "done",
          subject: "MAD101",
          createdAt: "2021-10-10",
          updatedAt: "2021-10-10",
        },
        {
          id: 1,
          title: "Bài tập 1",
          description: "Bài tập 1",
          deadline: "2021-10-10",
          status: "done",
          subject: "MAD101",
          createdAt: "2021-10-10",
          updatedAt: "2021-10-10",
        },
        {
          id: 1,
          title: "Bài tập 1",
          description: "Bài tập 1",
          deadline: "2021-10-10",
          status: "done",
          subject: "MAD101",
          createdAt: "2021-10-10",
          updatedAt: "2021-10-10",
        },
      ],
    },
    {
      subjectName: "PRO192",
      subjectTitle: "Lập trình hướng đối tượng với Java",
      image: require("../assets/subject-image/PRO192.png"),
    },
    {
      subjectName: "SSG104",
      subjectTitle: "Kỹ năng làm việc nhóm",
      image: require("../assets/subject-image/SSG104.png"),
    },
    {
      subjectName: "NWC203c",
      subjectTitle: "Mạng máy tính",
      image: require("../assets/subject-image/NWC203c.png"),
    },
  ],
};

export default subjectData;
