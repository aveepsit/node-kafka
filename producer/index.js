console.log("This is producer");
import Kafka from "node-rdkafka";

const stream = Kafka.Producer.createWriteStream(
  {
    "metadata.broker.list": "localhost:9092",
  },
  {},
  { topic: "test" }
);

function queueMessage() {
  const success = stream.write(Buffer.from("Hello"));
  console.log(success ? "Message wrote successfully" : "Message not written");
}

setInterval(() => {
  queueMessage();
}, 3000);
