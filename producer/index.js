console.log("This is producer");
import Kafka from "node-rdkafka";
import eventType from "../eventType.js";

const stream = Kafka.Producer.createWriteStream(
  {
    "metadata.broker.list": "localhost:9092",
  },
  {},
  { topic: "test" }
);

function getRandomAnimal() {
  const categories = ["CAT", "DOG"];
  return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomNoise(animal) {
  if (animal === "CAT") {
    const noises = ["Purr", "Meow", "Grrr"];
    return noises[Math.floor(Math.random() * noises.length)];
  } else if (animal === "DOG") {
    const noises = ["Woof", "Bark", "Grrr"];
    return noises[Math.floor(Math.random() * noises.length)];
  }
}

function queueMessage() {
  const category = getRandomAnimal();
  const noise = getRandomNoise(category);
  const event = { category, noise };
  console.log(event);
  const success = stream.write(eventType.toBuffer(event));
  console.log(success ? "Message wrote successfully" : "Message not written");
}

setInterval(() => {
  queueMessage();
}, 3000);
