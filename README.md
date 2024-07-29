
# SerialDeviceTracker

SerialDeviceTracker is a Node.js/TypeScript library to track connected and disconnected serial devices on both Linux and Windows. It uses platform-specific scripts to list devices and provides real-time monitoring on Linux using Chokidar, while Windows uses periodic polling to detect changes.

## Installation

```bash
npm install serial-device-tracker
```

## Usage

### List Connected Devices

```typescript
import { getConnectedDevices } from 'serial-device-tracker';

async function listDevices() {
    const devices = await getConnectedDevices();
    console.log('Connected devices:', devices);
}

listDevices();
```

### Monitor Device Changes

```typescript
import { monitorDevices, DeviceInfo } from 'serial-device-tracker';

function handleDeviceChange(addedDevices: DeviceInfo[], removedDevices: DeviceInfo[]) {
    addedDevices.forEach(device => console.log(`Device connected: ${device.device}`));
    removedDevices.forEach(device => console.log(`Device disconnected: ${device.device}`));
}

monitorDevices(handleDeviceChange);
```

## License

MIT
