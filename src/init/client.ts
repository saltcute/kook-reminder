import auth from '../configs/auth';
import Kasumi from "kasumi.js"
import { KasumiConfig } from 'kasumi.js/dist/type'

var config: KasumiConfig;

if (auth.mode == 'webhook') {
    config = {
        type: 'webhook',
        token: auth.khltoken,
        verifyToken: auth.khlverify,
        encryptKey: auth.khlkey,
        port: auth.khlport
    }
} else {
    config = {
        type: 'websocket',
        token: auth.khltoken
    }
}

export const bot = new Kasumi(config);
