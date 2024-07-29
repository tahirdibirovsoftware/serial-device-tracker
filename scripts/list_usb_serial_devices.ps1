Get-WmiObject Win32_SerialPort | Where-Object {
    $_.Description -like "*USB*" -or $_.PNPDeviceID -like "USB*"
} | Select-Object DeviceID, Description, Manufacturer
