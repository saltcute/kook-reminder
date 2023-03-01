import { reminder_register } from './reminder.register.app';
import { reminder_remove } from './reminder.remove.app';
import { reminder_get } from './reminder.get.app';
import { BaseMenu } from 'kasumi.js';

class ReminderMenu extends BaseMenu {
    name = 'reminder';
    prefix = './!';
}

export const reminder_menu = new ReminderMenu(reminder_get, reminder_register, reminder_remove);
