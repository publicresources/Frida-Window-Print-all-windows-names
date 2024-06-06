const user32 = Module.load('user32.dll');

if (user32) {
    console.log('dll loaded ');
} else {
    console.log('Failed to load user32.dll.');
}

const EnumWindows = new NativeFunction(
    Module.getExportByName('user32.dll', 'EnumWindows'),
    'bool',
    ['pointer', 'int']
);

const GetWindowTextLengthA = new NativeFunction(
    Module.getExportByName('user32.dll', 'GetWindowTextLengthA'),
    'int',
    ['pointer']
);

const GetWindowTextA = new NativeFunction(
    Module.getExportByName('user32.dll', 'GetWindowTextA'),
    'int',
    ['pointer', 'pointer', 'int']
);

const EnumWindowsProc = new NativeCallback(function(hwnd, lParam) {

    const length = GetWindowTextLengthA(hwnd);

    if (length > 0) {


        const buffer = Memory.alloc(length + 1);
        GetWindowTextA(hwnd, buffer, length + 1);
        const windowName = buffer.readCString();
        console.log('Window found:', windowName);
    }

    return 1;
}, 'int', ['pointer', 'int']);

EnumWindows(EnumWindowsProc, 0);

