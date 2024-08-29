import { fakerRU as faker, fakerEN } from "@faker-js/faker";
import type { Brief } from "./domain";

const gallery = [
  "https://randomwordgenerator.com/img/picture-generator/57e0d343485aab14f1dc8460962e33791c3ad6e04e5074417c2f7dd69445c1_640.jpg",
  "https://randomwordgenerator.com/img/picture-generator/54e9d14b4e52a814f1dc8460962e33791c3ad6e04e50744172297ed39649c4_640.jpg",
  "https://randomwordgenerator.com/img/picture-generator/53e0d5464f51a814f1dc8460962e33791c3ad6e04e507441722a72dc9e48c3_640.jpg",
  "https://randomwordgenerator.com/img/picture-generator/57e9dc434b5ba414f1dc8460962e33791c3ad6e04e50744172297bd5934cc4_640.jpg",
  "https://randompicturegenerator.com/img/cat-generator/g42f0c7f455898d8c885774bc78dbe661706bf5d87d59cda41ed00cff967dc44d61a7274d5c00c5caed5404e7cd1f3220_640.jpg",
  "https://randompicturegenerator.com/img/cat-generator/ge9db644b010d046c9a4c2f01e132948959134b9b409680e72b3d758f7da3f8667c637f23a3e8984870b2aeb982859983_640.jpg",
  "https://randompicturegenerator.com/img/cat-generator/g7d522c74c1aa07e3a6551cdf7aa8d1275c1df70a78a97d2e4e1260d303c1f3c25091aadc93c0d3b5b2d8d1c565feac2d_640.jpg",
  "https://randompicturegenerator.com/img/cat-generator/g01782305a4fa8328276cb0d34a80ce95fdb7b950e09cd8cf2f9beee3bd83c752a1ca084b5f3a0cc70219dea10d39138e_640.jpg",
  "https://randompicturegenerator.com/img/cat-generator/g253005065a1bad808ed7483af7d33958777fc7e5d780f4396d39febf3639f814a3a559977801be16de883a8c0f44f83b_640.jpg",
  "https://randompicturegenerator.com/img/cat-generator/g67e1cede95ccfc53fafba6031b9ba1b958d45e5889dbb7273be487b745392eda87606fd3ed27c7961e839dc99dd4a98e_640.jpg",
];

export const createBrief = (): Brief => {
  const publishDate = faker.date.anytime();
  return {
    id: faker.number.int(),
    ownerId: faker.number.int(),
    publishDate: publishDate.getTime(),
    publishDateString: publishDate.toLocaleString(),
    ownerLogin: `${fakerEN.word.adjective()}-${fakerEN.word.noun()}`,
    bulletinSubject: faker.lorem.sentence(),
    bulletinText: faker.lorem.paragraphs(),
    bulletinImages: faker.helpers.arrayElements(gallery, { min: 0, max: 6 }),
  };
};
