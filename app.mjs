import express from "express";
import path from 'path';
import dotenv from 'dotenv';
import expressEjsLayouts from "express-ejs-layouts";
import UserRoutes from './routes/userRoutes.mjs';


const app = express();
const __dirname = path.resolve();

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressEjsLayouts);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', UserRoutes);

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
    if (err) console.error(`Failed to connect the server (port no: ${PORT})`);
    else console.log(`successfully connected to http://localhost:${PORT}`);
});