import { bot } from 'init/client';
import { BaseCommand, CommandFunction, BaseSession } from 'kasumi.js';
import * as reminder from './reminderChannelList'

class ReminderRegister extends BaseCommand {
    name = 'register';
    description = '将当前频道注册为提醒频道';
    func: CommandFunction<BaseSession, any> = async (session) => {
        if (session.guildId) {
            let channel = await bot.API.channel.view(session.channelId);
            if (channel) {
                reminder.addChannel(channel.id);
                session.reply(`已添加频道「${channel.name}」(${channel.id})到提醒列表中`);
                bot.logger.info(`Added ${channel.id} to reminding list by ${session.author.username}#${session.author.identify_num} (${session.authorId})`);
            }
        } else {
            session.client.API.message.create(9, session.authorId, "不能给私聊添加提醒", session.messageId);
        }
    };
}

export const reminder_register = new ReminderRegister();