import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import {
  handleCreateDelegate,
  handleGetDelegate,
  handleGetDelegates,
} from "./handlers";
import { watchForProposal } from "./utils";

export interface aiResponse {
  id: number;
  response: string;
}

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 9000;

app.get("/delegates", handleGetDelegates);

app.get("/delegates/:id", handleGetDelegate);

app.post("/delegates", handleCreateDelegate);

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);

watchForProposal();
