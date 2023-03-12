import { ChatGPTAPI } from 'chatgpt'
const api = new ChatGPTAPI({
    apiKey: ''
  })

export async function example(text, id){ 
  
  if (id==='none'){
	const res = await api.sendMessage(text);
        return [res.text, res.id]
  }
  else{
	const res = await api.sendMessage(text, {
          parentMessageId: id
        });
	return [res.text, res.id]
  }
}
