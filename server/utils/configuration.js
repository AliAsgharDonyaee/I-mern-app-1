import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

const Configuration = () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	app.use(express.json());
	app.use(helmet());
	app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
	app.use(morgan("common"));
	app.use(bodyParser.json({ limit: "30mb", extended: true }));
	app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
	app.use(cors());
	app.use("/assets", express.static(path.join(__dirname, "public/assets")));
};

export default Configuration;
