import mongoose from "mongoose";
import app from "./app.mjs";

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch((err) => console.error('Error connecting to MongoDB.'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) console.error(`Failed to connect the server (port no: ${PORT})`);
    else console.log(`successfully connected to http://localhost:${PORT}`);
});