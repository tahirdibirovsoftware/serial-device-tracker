import chokidar from 'chokidar';
import { platform } from 'os';
import { listDevices } from './listDevices';
import { DeviceInfo } from './parsers';

let previousDevices: DeviceInfo[] = [];

function compareDevices(oldDevices: DeviceInfo[], newDevices: DeviceInfo[]) {
    const addedDevices = newDevices.filter(newDevice => !oldDevices.some(oldDevice => oldDevice.device === newDevice.device));
    const removedDevices = oldDevices.filter(oldDevice => !newDevices.some(newDevice => oldDevice.device === newDevice.device));
    
    return { addedDevices, removedDevices };
}

async function checkDevices(onDeviceChange: (addedDevices: DeviceInfo[], removedDevices: DeviceInfo[]) => void) {
    try {
        const newDevices = await listDevices();
        const { addedDevices, removedDevices } = compareDevices(previousDevices, newDevices);

        if (addedDevices.length > 0 || removedDevices.length > 0) {
            onDeviceChange(addedDevices, removedDevices);
        }

        previousDevices = newDevices;
    } catch (error) {
        console.error('Error checking devices:', error);
    }
}

export function watchDevices(onDeviceChange: (addedDevices: DeviceInfo[], removedDevices: DeviceInfo[]) => void) {
    const currentPlatform = platform();

    if (currentPlatform === 'linux') {
        const watcher = chokidar.watch(['/dev/ttyUSB*', '/dev/ttyACM*'], {
            persistent: true
        });

        watcher
            .on('add', path => checkDevices(onDeviceChange))
            .on('unlink', path => checkDevices(onDeviceChange));
    } else if (currentPlatform === 'win32') {
        setInterval(() => checkDevices(onDeviceChange), 5000);
    } else {
        console.error('Unsupported platform');
    }
}
