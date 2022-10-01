import { bot } from 'init/client';
import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import * as reminder from './reminderChannelList'

class ReminderRemove extends AppCommand {
    code = 'remove'; // 只是用作标记
    trigger = 'remove'; // 用于触发的文字
    help = '`.reminder remove`'; // 帮助文字
    intro = '';
    func: AppFunc<BaseSession> = async (session) => {
        if (session.guild) {
            reminder.addChannel(session.channel.id);
            session.reply(`已将频道「${session.channel.name}」(${session.channel.id})从提醒列表中移除`);
            bot.logger.info(`Removed ${session.channel.id} from reminding list by ${session.user.username}#${session.user.identifyNum} (${session.userId})`);
        } else {
            session.client.API.directMessage.create(9, session.userId, undefined, "不能从私聊移除提醒", session.msg.msgId);
        }
    };
}

export const reminder_remove = new ReminderRemove();