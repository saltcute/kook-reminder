import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import axios from 'axios';
import got from 'got';

class ReminderGet extends AppCommand {
    code = 'get'; // 只是用作标记
    trigger = 'get'; // 用于触发的文字
    help = '`.reminder get`'; // 帮助文字
    intro = '';
    func: AppFunc<BaseSession> = async (session) => {
        axios({
            url: "http://reminder.lolicon.ac.cn/random",
            method: "GET"
        }).then((res) => {
            console.log(res.data);
            session.client.API.asset.create(got.stream(`http://reminder.lolicon.ac.cn/image?img=${res.data}`), {
                filename: res.data,
                contentType: "image/png"
            }).then((res) => {
                session.client.API.message.create(2, session.channel.id, res.url);
            })
        })
    };
}

export const reminder_get = new ReminderGet();