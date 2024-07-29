import { listDevices, DeviceInfo } from './listDevices';
import { watchDevices } from './watcher';

export async function getConnectedDevices(): Promise<DeviceInfo[]> {
    return await listDevices();
}

export function monitorDevices(onDeviceChange: (addedDevices: DeviceInfo[], removedDevices: DeviceInfo[]) => void) {
    watchDevices(onDeviceChange);
}
