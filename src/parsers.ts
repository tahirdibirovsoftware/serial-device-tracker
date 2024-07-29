export interface DeviceInfo {
    device: string;
    model: string;
    vendor: string;
}

export function parseLinuxOutput(output: string): DeviceInfo[] {
    const devices: DeviceInfo[] = [];
    const lines = output.split('\n');

    let currentDevice: DeviceInfo | null = null;

    lines.forEach(line => {
        if (line.startsWith('Device:')) {
            if (currentDevice) {
                devices.push(currentDevice);
            }
            currentDevice = { device: line.split(': ')[1], model: '', vendor: '' };
        } else if (line.startsWith('ID_MODEL=') && currentDevice) {
            currentDevice.model = line.split('=')[1];
        } else if (line.startsWith('ID_VENDOR=') && currentDevice) {
            currentDevice.vendor = line.split('=')[1];
        }
    });

    if (currentDevice) {
        devices.push(currentDevice);
    }

    return devices;
}

export function parseWindowsOutput(output: string): DeviceInfo[] {
    const devices: DeviceInfo[] = [];
    const lines = output.split('\r\n');

    let currentDevice: DeviceInfo | null = null;

    lines.forEach(line => {
        if (line.startsWith('DeviceID')) {
            if (currentDevice) {
                devices.push(currentDevice);
            }
            currentDevice = { device: line.split(': ')[1], model: '', vendor: '' };
        } else if (line.startsWith('Description') && currentDevice) {
            currentDevice.model = line.split(': ')[1];
        } else if (line.startsWith('Manufacturer') && currentDevice) {
            currentDevice.vendor = line.split(': ')[1];
        }
    });

    if (currentDevice) {
        devices.push(currentDevice);
    }

    return devices;
}
