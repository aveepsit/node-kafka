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

function queueMessage() {
  const event = { category: "DOG", noise: "bark" };
  const success = stream.write(eventType.toBuffer(event));
  console.log(success ? "Message wrote successfully" : "Message not written");
}

setInterval(() => {
  queueMessage();
}, 3000);
