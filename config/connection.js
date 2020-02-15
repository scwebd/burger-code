var mysql = require("mysql");
// NICK:
// creating a global connection variable; we'll store a connection value in it later!
var connection;

// NICK:
// if there is an environment variable called JAWSDB_URL, use the values stored in it;
// this will pull all necessary database connection info (host, port, user, password, database)
// from the values provided by Heroku when you provisioned your JAWSDB database
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
// NICK:
// else if there is no such environment variable, use the local connection info below:
} else {
    connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "rootroot", // NICK: be sure to put your password here!
      database: "burgers_db"
    });
}


connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
