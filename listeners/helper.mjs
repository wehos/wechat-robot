import { ChatGPTAPI } from 'chatgpt'
const api = new ChatGPTAPI({
    apiKey: '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'
  })

export async function example(text, id){ 
//  const api = new ChatGPTAPI({
//    apiKey: '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'
//  })
  
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
