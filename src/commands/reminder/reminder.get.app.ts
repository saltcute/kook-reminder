import { BaseCommand, CommandFunction, BaseSession } from 'kasumi.js';
import axios from 'axios';
import { bot } from 'init/client';
import { MessageType } from 'kasumi.js/dist/type';
class ReminderGet extends BaseCommand {
    name = 'get';
    description = '随机获得一张提醒';
    func: CommandFunction<BaseSession, any> = async (session) => {
        axios({
            url: "http://reminder.lolicon.ac.cn/random",
            method: "GET"
        }).then(async (res) => {
            bot.logger.info(`Sent ${res.data} to ${session.author.username}#${session.author.identify_num} (${session.authorId}) in ${session.guildId}/${session.channelId}`);
            session.client.API.asset.create((await axios.get(`http://reminder.lolicon.ac.cn/image`, { params: { img: res.data }, responseType: 'arraybuffer' })).data, {
                filename: res.data,
                contentType: "image/png"
            }).then((res) => {
                bot.API.message.create(MessageType.ImageMessage, session.channelId, res.url);
            }).catch((e) => {
                bot.logger.error("Uploading image failed");
                bot.logger.error(e);
            })
        }).catch((e) => {
            bot.logger.error("Fetching random image failed");
            bot.logger.error(e);
        })
    };
}

export const reminder_get = new ReminderGet();