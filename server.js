import { app } from "./app.js";
import { connectDB } from './data/database.js';


connectDB();


app.listen(process.env.PORT, () => {
    console.log("app is listening on port 4000");
});
