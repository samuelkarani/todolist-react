import Faker from "faker";

export function ID() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

export function generateData(count = 1000000) {
  let data = [];

  for (let i = 0; i < count; i++) {
    data.push({
      id: Faker.random.uuid(),
      title: Faker.random.words(),
      completed: Faker.random.boolean()
    });
  }

  return new Promise((resolve, reject) => {
    resolve(data);
    reject("could not get Todo items");
  });
}
