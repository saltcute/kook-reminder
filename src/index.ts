import { bot } from 'init/client';
import { reminder_menu } from './commands/reminder/reminder.menu';
import schedule from 'node-schedule';
import axios from 'axios';
import got from 'got';
import * as reminder from './commands/reminder/reminderChannelList'

bot.logger.addStream({
    name: "kook-reminder",
    level: 30,
    stream: process.stdout
})

reminder.loadChannelList();
schedule.scheduleJob("0 * * * *", () => {
    axios({
        url: "http://reminder.lolicon.ac.cn/random",
        method: "GET"
    }).then((res) => {
        console.log(res.data);
        bot.API.asset.create(got.stream(`http://reminder.lolicon.ac.cn/image?img=${res.data}`), {
            filename: res.data,
            contentType: "image/png"
        }).then((res) => {
            reminder.channelList.forEach((val, key) => {
                if (val) {
                    bot.API.message.create(2, key, res.url);
                }
            })
        })
    })
})

bot.addCommands(reminder_menu);

bot.connect();

bot.logger.info('System initialization success');
