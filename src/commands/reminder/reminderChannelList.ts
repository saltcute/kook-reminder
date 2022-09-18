import fs from 'fs';
import upath from 'upath';

export var channelList: Map<string, boolean>;
export function saveChannelList() {
    fs.writeFileSync(upath.join(__dirname, "channelList.json"), JSON.stringify(Object.fromEntries(channelList)));
}
export function loadChannelList() {
    if (fs.existsSync(upath.join(__dirname, "channelList.json"))) {
        const data = JSON.parse(fs.readFileSync(upath.join(__dirname, "channelList.json"), { encoding: "utf-8" }));
        channelList = new Map(Object.entries(data));
    } else {
        channelList = new Map();
        saveChannelList();
    }
}
export function addChannel(channelId: string) {
    channelList.set(channelId, true);
    saveChannelList();
}
export function deleteChannel(channelId: string) {
    channelList.delete(channelId);
    saveChannelList();
}