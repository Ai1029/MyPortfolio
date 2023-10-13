import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// const userData: Prisma.UserCreateInput[] = [
//   {
//     name: "石渡愛",
//     introduction: "初めまして。エンジニアを目指しています",
//     hobby: "映画、読書、華道、茶道",
//     email: "ishiwatari@gmail.com",
//     password: "ishiwataai",
//     uid: "BLXKvBYVKtdMtkWu0LyQENuWqfdsadfaug1",
//     skill: {
//       create: [
//         {
//           name: "Illustrator",
//           description: "習い始めです",
//           skilllevel: {
//             create: {
//               level: "レベル1",
//             },
//           },
//         },
//         {
//           name: "Photoshop",
//           description: "習い始めです",
//           skilllevel: {
//             create: {
//               level: "レベル1",
//             },
//           },
//         },
//         {
//           name: "InDesign",
//           description: "習い始めです",
//           skilllevel: {
//             create: {
//               level: "レベル1",
//             },
//           },
//         },
//         {
//           name: "Premiere Pro",
//           description: "習い始めです",
//           skilllevel: {
//             create: {
//               level: "レベル1",
//             },
//           },
//         },
//         {
//           name: "After Effect",
//           description: "習い始めです",
//           skilllevel: {
//             create: {
//               level: "レベル1",
//             },
//           },
//         },
//         {
//           name: "Javascript",
//           description: "習い始めです",
//           skilllevel: {
//             create: {
//               level: "レベル1",
//             },
//           },
//         },
//         {
//           name: "Go",
//           description: "習い始めです",
//           skilllevel: {
//             create: {
//               level: "レベル1",
//             },
//           },
//         },
//         {
//           name: "Python",
//           description: "習い始めです",
//           skilllevel: {
//             create: {
//               level: "レベル1",
//             },
//           },
//         },
//       ],
//     },
//     experience: {
//       create: [
//         {
//           name: "歯科助手",
//           description: "歯科医院で歯科助手と受付を担当。受付周りの制作も担当",
//         },
//         {
//           name: "グラフィックデザイナー",
//           description:
//             "広告代理店で紙媒体メインでチラシやポスター、パンフレットを制作。一部Webサイトのデザインも担当",
//         },
//         {
//           name: "アートディレクター",
//           description:
//             "広告代理店で紙媒体メインでチラシやポスター、パンフレットを制作進行",
//         },
//       ],
//     },
//     sns: {
//       create: [
//         {
//           url: "https://twitter.com/",
//           typeofSNS: {
//             create: {
//               typeofSNS: "Twitter",
//             },
//           },
//         },
//         {
//           url: "https://github.com/Ai1029",
//           typeofSNS: {
//             create: {
//               typeofSNS: "Twitter",
//             },
//           },
//         },
//       ],
//     },
//     image: {
//       create: {
//         name: "test.png",
//         url: "https://",
//       },
//     },
//   },
// ];

const typeofSNS: Prisma.TypeofSNSCreateInput[] = [
  {
    typeofSNS: "Twitter",
  },
  {
    typeofSNS: "Facebook",
  },
  {
    typeofSNS: "GitHub",
  },
  {
    typeofSNS: "Qiita",
  },
  {
    typeofSNS: "Zenn",
  },
  {
    typeofSNS: "note",
  },
  {
    typeofSNS: "Wantedly",
  },
  {
    typeofSNS: "YOUTRUST",
  },
];

const skillLevelData: Prisma.SkillLevelCreateInput[] = [
  {
    level: "初級",
    levelper: 25,
    levelperleft: 75,
  },
  {
    level: "中級",
    levelper: 50,
    levelperleft: 50,
  },
  {
    level: "上級",
    levelper: 75,
    levelperleft: 25,
  },
  {
    level: "エキスパート",
    levelper: 100,
    levelperleft: 0,
  },
];

const experienceCategoryData: Prisma.ExperienceCategoryCreateInput[] = [
  {
    name: "仕事",
  },
  {
    name: "学び",
  },
];

const yearData: Prisma.YearCreateInput[] = [];
const currentYear = new Date().getFullYear();

for (let year = 1970; year <= currentYear; year++) {
  yearData.push({
    year: year + "年",
  });
}

const monthData: Prisma.MonthCreateInput[] = [
  {
    month: "1月",
  },
  {
    month: "2月",
  },
  {
    month: "3月",
  },
  {
    month: "4月",
  },
  {
    month: "5月",
  },
  {
    month: "6月",
  },
  {
    month: "7月",
  },
  {
    month: "8月",
  },
  {
    month: "9月",
  },
  {
    month: "10月",
  },
  {
    month: "11月",
  },
  {
    month: "12月",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  // for (const u of userData) {
  //   const user = await prisma.user.create({
  //     data: u,
  //   });
  //   console.log(`Created user with id: ${user.id}`);
  // }

  for (const snsData of typeofSNS) {
    const sns = await prisma.typeofSNS.create({
      data: snsData,
    });
    console.log(`Created typeofSNS: ${sns.id}`);
  }

  for (const skillLevel of skillLevelData) {
    const skill = await prisma.skillLevel.create({
      data: skillLevel,
    });
    console.log(`Created skillLevel: ${skill.id}`);
  }

  for (const experienceCategory of experienceCategoryData) {
    const experiencecategory = await prisma.experienceCategory.create({
      data: experienceCategory,
    });
    console.log(`Created experienceCategory: ${experiencecategory.id}`);
  }

  for (const year of yearData) {
    const existYear = await prisma.year.findUnique({
      where: { year: year.year as string },
    });
    if (!existYear) {
      const yeardata = await prisma.year.create({
        data: year,
      });
      console.log(`Created year: ${yeardata.id}`);
    } else {
      console.log(`Year with value ${year.year} already exist`);
    }
  }

  for (const month of monthData) {
    const existMonth = await prisma.month.findUnique({
      where: { month: month.month as string },
    });
    if (!existMonth) {
      const monthdata = await prisma.month.create({
        data: month,
      });
      console.log(`Created month: ${monthdata.id}`);
    } else {
      console.log(`Month with volue ${month.month} already exist`);
    }
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
