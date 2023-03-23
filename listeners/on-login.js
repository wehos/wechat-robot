/*
 * @Author: Peanut
 * @Description:  登录
 * @Date: 2020-05-20 23:21:06
 * @Last Modified by: Peanut
 * @Last Modified time: 2021-04-19 22:07:28
 */
const config = require("../config");
const CACHE_FILE_PATH = config.USERDICT;
const schedule = require("node-schedule");
const fs = require('fs');
/**
 * @description 您的机器人上线啦
 * @param {} user
 */

function setSchedule(date, callback) {
  schedule.scheduleJob(date, callback)
}

async function onLogin(bot) {
  const time = "*/2 * * * *"
  setSchedule(time, async () => {
      //console.log('check file')
      const users = Object.keys(private_ids)  
      //console.log('start promise')
      await bot.getChats().then(async (chats)=> {
	await chats.map(async (chat) => {
          if (chat.isGroup) {
            return;
          } else {
            //console.log('seed run')
	    if (Math.random() < 0.95) return;
	    await chat.getContact().then(async (c) => {
              const u = c.number;
              const duration = await chat.fetchMessages({'limit': 1, 'fromMe': false}).then((ms) => {
		return Date.now()/1000 - ms[0].timestamp;
	      })
              if (!users.includes(u)) return;
	      if (duration < 3600) return;
	      try {
                  const time = new Date().toLocaleString('en-US', {timeZone: 'America/New_York'}).replace(/:\d{1,2} /, '');
                  let res = await (await import('./helper.mjs'))
                    .send_message(`(这是一条系统消息)${c.pushname}已经一段时间没有理你了，请你根据当前系统时间"${time}"和之前的对话自行判断${c.pushname}是否在忙或者在睡觉，如果是，请不要打扰他并直接回复“先别打扰他。”否则，你可以根据当前的系统时间${time}以及之前的对话来告诉他一些有意思的事以吸引他的注意力。你的回复中严禁透露出系统消息的存在。`, 
                    private_ids[u], '系统消息', private_prompts[u]);
                  if (res.text.search('系统')!=-1) {console.log(res.text); return;}
                  if (res.text.search('打扰')!=-1) {console.log(res.text); return;} 
                  if (res.text.search('睡')!=-1 || res.text.search('忙')!=-1) {console.log(res.text); return;}
                  res.text = res.text.replaceAll('~', '～')
                  res.text = res.text.replace(/\[.*\]\[.*\][:：][ ]?/, '')
                  //console.log(res.text)
                  await chat.sendMessage(res.text).then((m) => {});
                  private_ids[u] = res.id;

              }
              catch (error){
                console.log(`OpenAI API error: ${error}`)
                return {'text': '', 'id': '-1'}
              }
            }).catch((e)=>{console.log(e);});
          }
        })
      }).catch((e)=>{console.log(e);});
      //await bot.send_message(str);
    });
}
module.exports = onLogin;
