import { ChatGPTAPI } from 'chatgpt'

const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY })

export async function test(){
// send a message and wait for the response
let res = await api.sendMessage('What is OpenAI?')
console.log(res.text)

console.log('Can you expand on that?')
// send a follow-up
res = await api.sendMessage('Can you expand on that?', {
   parentMessageId: res.id
   })
   console.log(res.text)
console.log(res.id)
console.log('What were we talking about?')
   // send another follow-up
   res = await api.sendMessage('What were we talking about?', {
     parentMessageId: res.id
     })
     console.log(res.text)
}

