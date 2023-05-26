import { RequestHandler, Request, Response } from "express";
import { callGPT } from "../services/gptService";

export const generateAnswerbyGPT: RequestHandler = (req: Request, res: Response) => {
    const { baseText, userContent } = req.body;
    callGPT(baseText, userContent)
      .then(response => {
          if(response) res.status(200).json(response)
      })
      .catch(err => console.log(err))
}
