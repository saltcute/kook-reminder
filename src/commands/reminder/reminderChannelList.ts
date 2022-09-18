export var channelList: Map<string, boolean> = new Map();
export function addChannel(channelId: string) {
    channelList.set(channelId, true);
}
export function deleteChannel(channelId: string) {
    channelList.delete(channelId);
}