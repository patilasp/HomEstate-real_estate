import { createConnection } from 'mysql';

var con = createConnection({
    host: 'localhost',
    user: 'root',
    

 });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});