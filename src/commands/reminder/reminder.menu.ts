import { Card, MenuCommand } from 'kbotify';
import { reminder_register } from './reminder.register.app';
import { reminder_remove } from './reminder.remove.app';
import { reminder_get } from './reminder.get.app';

class ReminderMenu extends MenuCommand {
    code = 'reminder';
    trigger = 'reminder';
    help = 'Menu';

    intro = '复读菜单';
    menu = new Card({
        "type": "card",
        "theme": "info",
        "size": "lg",
        "modules": [
            {
                "type": "section",
                "text": {
                    "type": "kmarkdown",
                    "content": "```plain\n.reminder register\n```\n在当前频道启用小助手（需要拥有发送信息的权限）"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "kmarkdown",
                    "content": "```plain\n.reminder remove\n```\n在当前频道停用小助手"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "kmarkdown",
                    "content": "```plain\n.reminder get\n```\n随机获得一条提醒"
                }
            }
        ]
    }).toString();
    useCardMenu = true; // 使用卡片菜单
}

export const reminder_menu = new ReminderMenu(reminder_get, reminder_register, reminder_remove);
