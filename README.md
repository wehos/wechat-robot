### 使用 nodejs + wecharty 打造你的个人微信机器人

[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-green.svg)](https://github.com/chatie/wechaty) (https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)

[2022-07-26：Use UOS web protocol to achieve wechat login](https://github.com/wechaty/puppet-wechat/pull/206)

### Dependency

- node.js >= 16  
- [wechaty](https://github.com/wechaty/wechaty) 个人微信账号的微信机器人 SDK
- [superagent](https://github.com/visionmedia/superagent) 数据请求
- [cheerio](https://github.com/cheeriojs/cheerio) nodejs 版 jQuery，用于抓取页面内容
- [node-schedule](https://github.com/node-schedule/node-schedule) 一个在 nodejs 中设置定时任务的库
- [qrcode-terminal](https://github.com/gtanner/qrcode-terminal) 在控制台打印二维码
- [chatgpt](https://github.com/transitive-bullshit/chatgpt-api) Chatgpt API for nodejs

### Directory Structure

- `config`存放公共配置以及`superagent`请求相关配置
- `imgs`存放相关图片
- `listeners`存放机器人初始化后一系列 callback
  - `on-friendship.js` 处理好友请求
  - `on-login.js` 处理登录
  - `on-message.js` 处理用户消息、群消息
  - `on-scan.js` 处理登录二维码
- `schedule` 对`node-schedule`进行了封装
- `superagent` 存放所有的数据请求、接口封装都在此
- `utils` 公用方法的封装
- `app.js` 入口文件

### 修改`config`配置

打开`config/index.js` 文件，将里面的配置改为自己的。

### 运行测试

```bash
cnpm start //npm start
```



底层 api 基于 [wechaty](https://github.com/wechaty/wechaty)

更多微信消息、群消息、好友、对话等相关 api 可查阅官方文档 [wechaty 官方文档](https://github.com/wechaty/wechaty/blob/master/docs/index.md)
