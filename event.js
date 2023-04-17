const EventEmitter = require("events");

//create instance of Class
const emitter = new EventEmitter();
//give naming and cb
emitter.on("some_event", (data) => {
  console.log(data.id);
});
//call
emitter.emit("some_event", { id: 1, text: "my emit" });
