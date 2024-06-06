import pg from "pg";
const { Pool } = pg;

const client = new Pool();

client
  .connect()
  .then(() => {
    console.log("Connected to database succesfully");
  })
  .catch((error) => {
    console.error("There was an error while connecting to database: ", error);
  });

export default client;
