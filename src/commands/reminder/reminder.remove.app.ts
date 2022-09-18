import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import * as reminder from './reminderChannelList'

class ReminderRemove extends AppCommand {
    code = 'remove'; // 只是用作标记
    trigger = 'remove'; // 用于触发的文字
    help = '`.reminder remove`'; // 帮助文字
    intro = '';
    func: AppFunc<BaseSession> = async (session) => {
        reminder.deleteChannel(session.channel.id);
        session.reply(`已从提醒列表中移除频道「${session.channel.name}」(${session.channel.id})`);
    };
}

export const reminder_remove = new ReminderRemove();