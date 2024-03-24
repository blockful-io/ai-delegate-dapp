import {
  constitutionContent,
  createAIObject,
  responseRules,
} from "../aiFunctions";
import { Request, Response } from "express";
import { ChatCompletionMessageParam } from "openai/resources";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

export const handleCreateDelegate = async (req: Request, res: Response) => {
  console.log(req.body);
  if (!req.body.message)
    return res.status(400).send("body.message is required");

  const privateKey = generatePrivateKey();
  const publicKey = privateKeyToAccount(privateKey).address;

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: req.body.message },
    { role: "system", content: constitutionContent },
    { role: "system", content: responseRules },
  ];

  await createAIObject(req.body.name, messages, privateKey, publicKey);
  res.send({ ok: true });
};
