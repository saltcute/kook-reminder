import { bot } from 'init/client';
import { reminder_menu } from './commands/reminder/reminder.menu';
import schedule from 'node-schedule';
import axios from 'axios';
import got from 'got';
import * as reminder from './commands/reminder/reminderChannelList'
import auth from 'configs/auth';

reminder.loadChannelList();
schedule.scheduleJob("0 * * * *", () => {
    axios({
        url: "http://reminder.lolicon.ac.cn/hourly",
        method: "GET"
    }).then(async (res) => {
        bot.logger.info(`Hourly reminder: ${res.data}`)
        const buffer = (await axios.get(`http://reminder.lolicon.ac.cn/image`, { params: { img: res.data }, responseType: 'arraybuffer' })).data;
        bot.API.asset.create(buffer, {
            filename: res.data,
            contentType: "image/png"
        }).then((res) => {
            reminder.channelList.forEach((val, key) => {
                if (val && res?.url) {
                    bot.API.message.create(2, key, res.url).catch((e) => {
                        bot.logger.error(`Sending hourly image to ${key} failed`);
                        bot.logger.error(e);
                        bot.logger.error(e.message)
                        if (e.message == "Request failed with status code 403") {
                            reminder.deleteChannel(key);
                        }
                    });
                }
            })
        }).catch((e) => {
            bot.logger.error("Uploading image failed");
            bot.logger.error(e);
        })
    }).catch((e) => {
        bot.logger.error("Fetching hourly image failed");
        bot.logger.error(e);
    })
})

bot.plugin.load(reminder_menu);

bot.connect();

bot.logger.info('System initialization success');

if (auth.useBotMarket) {
    botMarketStayOnline();
}

function botMarketStayOnline() {
    axios({
        url: 'http://bot.gekj.net/api/v1/online.bot',
        method: "POST",
        headers: {
            uuid: auth.botMarketUUID
        }
    }).then((res) => {
        if (res.data.code == 0) {
            bot.logger.info(`BotMarket: Successfully updated online status with remote returning: `);
            bot.logger.info(res.data);
            setTimeout(botMarketStayOnline, (res.data.data.onTime + 5) * 1000);
        } else if (res.data.code == -1) {
            bot.logger.warn(`BotMarket: Failed updating online status with remote returning: `);
            bot.logger.warn(res.data);
            bot.logger.warn(`BotMarket: Retries in 30 minutes`);
            setTimeout(botMarketStayOnline, 30 * 60 * 1000);
        }
    }).catch((e) => {
        bot.logger.warn(`BotMarket: Failed updating online status with remote returning: `);
        bot.logger.warn(e.message);
        bot.logger.warn(`BotMarket: Retries in 30 minutes`);
        setTimeout(botMarketStayOnline, 30 * 60 * 1000);
    })
}
