
# AI Generator BackEnd

Esse repositório consite no backend do projeto desenvolvido para o ETHSamba hackaton. Aqui temos tanto o servidor da aplicação, como arquivos para criação de AIs usando a api do ChatGPT, scripts para comunicação com os contratos deployados na blockchain e arquivos com funções uteis para o projeto.


## Install

Clone the repository

```bash
  git clone https://github.com/blockful-io/ai-delegate-backend.git 
```
    
Instale as bibliotecas necessarias com npm

```bash
  npm install 
```
    
## Deploy

To run the server locally, run the following

```bash
  ts-node server.ts
```

The server will be listenning for calls from the front end and events in the smart contract.

If you want to make some API call to se the server working, use the following command. The requester will make an get call and a post one.

```bash
  ts-node requester.ts
```

To make a proposal to the smart contract and see the server listenning to it:

```bash
  ts-node makeProposal.ts
```


## Documentação da API

#### Return all AI delegates

```http
  GET /delegates
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `null` | `null` | No parameter needed |

#### Return an Ai delegate

```http
  GET /delegates/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Needed**. The ID of the wanted item |


#### Create new AI delegate

```http
  POST /delegates
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `message`      | `string` | **Needed**. Prompt to be use in the entity generation |



## Functions 

### server.ts 
#### watchForProposal(num1, num2)
Keep watching if some proposal was add in the smart contracts. If so, it calls evaluateProposal to create the AIs and get their response. After it, castVoteBySig is called and the AI vote for some proposal.

### aiFunctions.ts 
#### getAiList(filePath: string): Promise<AIObject[]>
Reads the database and return a list of all AI created.

#### createAIObject(name: string, messages: ChatCompletionMessageParam[], privateKey: string, publicKey: string): Promise<AIObject> 
Creates a new AI entity and write it in the database.

#### evaluateProposal(description: string, messages: ChatCompletionMessageParam[]): Promise<string>
Receive description and messages, pass it to the AI entity and return its vote.


#### castVoteBySig(proposalId: bigint, support: number, reason: string)
Receive the proposalId, the AI vote and the justification. Then, make a call castVoteBySigWithReason to the contracts.

### makeProposal.ts 
#### makeProposal(proposal: string) 
Creates a proposal and pass it to the governor contract. 

### requester.ts 
#### fazerGet() 
Makes a get call in the server's API to get the AI list.

#### fazerPost() 
Makes a post call in the server's API to create new AI.
