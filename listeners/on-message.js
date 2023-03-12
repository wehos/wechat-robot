/*
 * @Author: Peanut
 * @Description:  处理用户消息
 * @Date: 2020-05-20 22:36:28
 * @Last Modified by: Peanut
 * @Last Modified time: 2021-04-19 22:02:53
 */
const path = require("path");
const { FileBox } = require("file-box");
const config = require("../config");
const { colorRGBtoHex, colorHex } = require("../utils");
var parentMessageId = 'none'
var default_prompt = ''

async function chatgpt(text) {
    return (await import('./helper.mjs')).example(text, parentMessageId);
}

/**
 * sleep
 * @param {*} ms
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
/**
 * 处理消息
 */
async function onMessage(msg, bot) {
  //防止自己和自己对话
  if (msg.self()) return;
  const room = msg.room(); // 是否是群消息
  if (room) {
    //处理群消息
    await onWebRoomMessage(msg, bot);
  } else {
    //处理用户消息  用户消息暂时只处理文本消息。后续考虑其他
    console.log("bot.Message", bot.Message);
    const isText = msg.type() === bot.Message.Type.Text;
    if (isText) {
      await onPeopleMessage(msg, bot);
    }
  }
}
/**
 * 处理用户消息
 */
async function onPeopleMessage(msg, bot) {
  if (msg.age() > 120) {
    console.log('Message discarded because its TOO OLD(than 2 min)')
    return
  }
  //获取发消息人
  const contact = msg.talker();
  //对config配置文件中 ignore的用户消息不必处理
  if (config.IGNORE.includes(contact.payload.name)) return;
  let content = msg.text().trim(); // 消息内容 使用trim()去除前后空格
  if (contact.payload.name === 'Wehos'){
    if (content === "clean")
       parentMessageId = 'none';
    else if (content.indexOf("prompt") === 0) {
       const res = await chatgpt(content.replace("prompt", ""))
       parentMessageId = res[1]
       await msg.say(res[0])     
    } else if (content.indexOf("chat酱") === 0) {
       const res = await chatgpt(content)
       parentMessageId = res[1]
       await msg.say(res[0])
    } else if (content.indexOf("set") === 0){
       default_prompt = content.slice(3)
    } else if (content === "reset" || content === "default"){
       parentMessageId = 'none'
       const res = await chatgpt(default_prompt)
       parentMessageId = res[1]
       await msg.say(res[0])
    } else if (content === "display" || content === "print") {
       await msg.say(`Default prompt: ${default_prompt} \n MessageId: ${parentMessageId}`)
    }

  } else if (content === "菜单") {
    await delay(200);
    await msg.say('现在什么都没有了哦');
  } else if (false) {
  } else {
    const noUtils = await onUtilsMessage(msg, bot);
    if (noUtils) {
      await delay(200);
      await msg.say(allKeywords);
    }
  }
}

/**
 * 处理群消息
 */
async function onWebRoomMessage(msg, bot) {
  if (msg.age() > 300) {
    console.log('Message discarded because its TOO OLD(than 5 mins)')
    return
  }
  const isText = msg.type() === bot.Message.Type.Text;
  if (isText) {
    const content = msg.text().trim(); // 消息内容
    const contact = msg.talker().name();
    if (content === "毒鸡汤") {
      const title = ""
      const str = "别喝了，伤身体"
      await msg.say(str);
    } else if (content.indexOf("chat酱") === 0 
	    || content.indexOf("@Chat酱") === 0) {
      const res = await chatgpt(`\$${contact}\$ ${content}`);
      if (! parentMessageId === 'none'){
	  parentMessageId = res[1]
      }
      //await delay(200);
      //await msg.say(`en：${res.en}<br><br>zh：${res.zh}`);
      await msg.say(`@${contact} ${res[0]}`)
    } else {
      return//await onUtilsMessage(res, bot);
    }
  }
}

/**
 * utils消息处理
 */
async function onUtilsMessage(msg, bot) {
  const contact = msg.talker(); // 发消息人
  const isText = msg.type() === bot.Message.Type.Text;
  if (isText) {
    let content = msg.text().trim(); // 消息内容
    if (content.indexOf("转大写") === 0) {
      try {
        const str = content.replace("转大写", "").trim().toUpperCase();
        await msg.say(str);
      } catch (error) {
        await msg.say("转换失败，请检查");
      }
    } else if (content.indexOf("转小写") === 0) {
      try {
        const str = content.replace("转小写", "").trim().toLowerCase();
        await msg.say(str);
      } catch (error) {
        await msg.say("转换失败，请检查");
      }
    } else if (content.indexOf("转16进制") === 0) {
      try {
        const color = colorRGBtoHex(content.replace("转16进制", "").trim());
        await msg.say(color);
      } catch (error) {
        console.error(error);
        await msg.say("转换失败，请检查");
      }
    } else if (content.indexOf("转rgb") === 0) {
      try {
        const color = colorHex(content.replace("转rgb", "").trim());
        await msg.say(color);
      } catch (error) {
        console.error(error);
        await msg.say("转换失败，请检查");
      }
    }
  } else {
    return true;
  }
}
module.exports = onMessage;
