import { bot } from 'init/client';
import { BaseCommand, CommandFunction, BaseSession } from 'kasumi.js';
import * as reminder from './reminderChannelList'

class ReminderRemove extends BaseCommand {
    name = 'remove';
    description = '将当前频道取消注册';
    func: CommandFunction<BaseSession, any> = async (session) => {
        if (session.guildId) {
            const { err, data: channel } = await bot.API.channel.view(session.channelId);
            if (err) return this.logger.error(err);
            if (channel) {
                reminder.deleteChannel(channel.id);
                session.reply(`已将频道「${channel.name}」(${channel.id})从提醒列表中移除`);
                bot.logger.info(`Removed ${channel.id} from reminding list by ${session.author.username}#${session.author.identify_num} (${session.authorId})`);
            }
        } else {
            session.client.API.message.create(9, session.authorId, "不能从私聊移除提醒", session.messageId);
        }
    };
}

export const reminder_remove = new ReminderRemove();