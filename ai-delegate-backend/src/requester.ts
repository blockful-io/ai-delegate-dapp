import axios from 'axios';
import { ChatCompletionMessageParam } from 'openai/resources/chat';

async function fazerGet() {
  try {
    const response = await axios.get('http://localhost:9000/delegates');
    console.log('Resposta do servidor:', response.data);
  } catch (error) {
    console.error('Erro ao fazer solicitação GET:', error);
  }
}

async function fazerPost() {
    try {
      const response = await axios.post('http://localhost:9000/delegates', {message: "Exemplo de mensagem do usuário" });//
      
      console.log('Resposta do servidor (POST):', response.data);
    } catch (error) {
      console.error('Erro ao fazer solicitação POST:', error);
    }
}
  
async function main() {
    //await fazerGet();
    await fazerPost();
}

main();
