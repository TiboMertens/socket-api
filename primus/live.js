module.exports.go = (server) => {
  const Primus = require("primus");
  const primus = new Primus(server, {});

  //check if primus is working, then log
  primus.on("connection", (spark) => {
    console.log("connected");

    //check if data received from client, then log
    spark.on("data", (data) => {
      console.log(data);
      if (data.action === "newMessage") {
        primus.write({
          action: "newMessage",
          message: data.message,
        });
      }
    });
  });
};