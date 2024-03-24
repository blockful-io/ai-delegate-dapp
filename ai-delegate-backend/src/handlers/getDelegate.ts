import { getAiList } from "../aiFunctions";
import { Request, Response } from "express";

export const handleGetDelegate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const aiList = await getAiList();
  const ai = aiList.find((ai) => ai.id.toString() == id);
  if (ai) {
    return res.status(200).json({
      id: ai.id,
      summary: ai.messages[0].content,
      address: ai.publicKey,
    });
  }
  return res.status(400).json({ error: "AI not found" });
};
