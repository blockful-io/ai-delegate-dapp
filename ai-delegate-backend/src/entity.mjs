import OpenAI from "openai";
import constitutionContent from "./aiFunctions"
const openai = new OpenAI();

export async function makeProposal(proposal){


  const entitySpec= `In DAOs, decision-making occurs through governance and voting mechanisms. I would like you to simulate an entity with voting power biased towards protocol improvements, meaning it favors this area. Consider the constitution I provided. I will present a proposal, and I want you to generate your vote (yes or no) along with a justification.`;
  const messages = [
    { role: "system", content: entitySpec },
    { role: "system", content: constitutionContent },
    { role: "user", content: "Proposal 2 -> Eliminates fees to create ENS domains." }
  ];
  
  const completion = await openai.chat.completions.create({
    messages,
    model: "gpt-4"
  });


  const voteContent = completion.choices[0].message.content.split("\n\n");
  console.log("\n", voteContent);

}

makeProposal("Proposal 2 -> Eliminates fees to create ENS domains.");
//export {makeProposal};