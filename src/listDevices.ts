import { exec } from 'child_process';
import { platform } from 'os';
import { join } from 'path';
import { parseLinuxOutput, parseWindowsOutput, DeviceInfo } from './parsers';

const scriptPaths: { [key: string]: string } = {
    linux: join(__dirname, '../scripts/list_usb_serial_devices.sh'),
    win32: join(__dirname, '../scripts/list_usb_serial_devices.ps1')
};

export function listDevices(): Promise<DeviceInfo[]> {
    return new Promise((resolve, reject) => {
        const currentPlatform = platform();

        if (!scriptPaths[currentPlatform]) {
            reject(new Error(`Unsupported platform: ${currentPlatform}`));
            return;
        }

        const scriptPath = scriptPaths[currentPlatform];
        const command = currentPlatform === 'win32' ? `powershell.exe -File ${scriptPath}` : `bash ${scriptPath}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            if (stderr) {
                reject(new Error(stderr));
                return;
            }

            const devices = currentPlatform === 'linux' ? parseLinuxOutput(stdout) : parseWindowsOutput(stdout);
            resolve(devices);
        });
    });
}

export { DeviceInfo };
