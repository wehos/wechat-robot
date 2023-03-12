### Wechat Chatgpt Robot based on Wechaty (node js ver.)

[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-green.svg)](https://github.com/chatie/wechaty) 

[2022-07-26：Use UOS web protocol to achieve wechat login](https://github.com/wechaty/puppet-wechat/pull/206)

### Dependency

- node.js >= 16  
- [wechaty](https://github.com/wechaty/wechaty) Wechat Robot SDK
- [wechaty-puppet-wechat](https://github.com/wechaty/puppet-wechat) Web protocol for Wechat that supports UOS
- [cheerio](https://github.com/cheeriojs/cheerio) jQuery (nodejs ver.) for fetching web resources
- [node-schedule](https://github.com/node-schedule/node-schedule) Task scheduler in nodejs
- [qrcode-terminal](https://github.com/gtanner/qrcode-terminal) Printing qrcode in console.
- [chatgpt](https://github.com/transitive-bullshit/chatgpt-api) Chatgpt API for nodejs

### Directory Structure

- `config` for personalized settings
- `imgs` for storing images
- `listeners` for callback functions of the chatbot
  - `on-friendship.js` processing friend requests
  - `on-login.js` processing login events
  - `on-message.js` responding to messages
  - `on-scan.js` processing qrcodes for login
- `schedule` wrapper of `node-schedule`
- `utils` public utils
- `app.js` main entrance

### `config` Setup

Edit `config/index.js` for personalized settings.

### Run

```bash
npm start
```



Wechat API based on [wechaty](https://github.com/wechaty/wechaty).   
More usage of wechaty can be found on [wechaty 官方文档](https://github.com/wechaty/wechaty/blob/master/docs/index.md)

