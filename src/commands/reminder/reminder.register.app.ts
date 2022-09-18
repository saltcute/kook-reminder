import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import * as reminder from './reminderChannelList'

class ReminderRegister extends AppCommand {
    code = 'register'; // 只是用作标记
    trigger = 'register'; // 用于触发的文字
    help = '`.reminder register`'; // 帮助文字
    intro = '';
    func: AppFunc<BaseSession> = async (session) => {
        reminder.addChannel(session.channel.id);
        session.reply(`已添加频道「${session.channel.name}」(${session.channel.id})到提醒列表中`);
    };
}

export const reminder_register = new ReminderRegister();