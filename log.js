const EventEmitter = require("events");

//create instance of Class
class Logger extends EventEmitter {
  log = (msg) => {
    //here some logic
    console.log(msg);

    //here we call emit new event
    this.emit("some_event", { id: 1, text: "new event" });
  };
}

const logger = new Logger();
//here we subsciribe on new event
logger.on("some_event", (data) => {
  console.log(data.text);
});

//here we call method with logic and event

logger.log("hello");
