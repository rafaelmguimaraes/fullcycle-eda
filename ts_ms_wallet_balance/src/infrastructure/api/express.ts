import express, { Express, Request, Response } from "express";
import { accountRoute } from "./routes/account.route";


export const app: Express = express();

app.use(express.json());
app.use("/account", accountRoute);

app.use((err: Error , _req: Request, res: Response, ): void => {
  console.error(err.stack);
  res.status(500).send("Internal server error");
});
