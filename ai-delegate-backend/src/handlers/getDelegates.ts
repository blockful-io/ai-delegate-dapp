import { getAiList } from "../aiFunctions";
import { Request, Response } from "express";

export const handleGetDelegates = async (req: Request, res: Response) => {
  const delegates = await getAiList();
  const response = delegates.map((delegate) => {
    return {
      id: delegate.id,
      summary: delegate.messages[0].content,
      address: delegate.publicKey,
    };
  });
  res.send(response);
};
