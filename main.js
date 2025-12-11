const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    kiosk: true, // True kiosk mode - captures everything
    frame: false, // No window frame
    alwaysOnTop: true, // Always stays on top
    icon: path.join(__dirname, 'assets/icon.png'), // App icon
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      devTools: false // Disable dev tools in production
    }
  });

  mainWindow.loadFile('index.html');

  // Remove menu bar
  mainWindow.setMenuBarVisibility(false);

  // Prevent the window from being closed normally
  mainWindow.on('close', (event) => {
    event.preventDefault();
    // Window can only be closed via our special key combo
  });

  // Block all default shortcuts
  mainWindow.webContents.on('before-input-event', (event, input) => {
    // Allow our special exit combo: Ctrl+Alt+Shift+Q
    if (input.control && input.alt && input.shift && input.key.toLowerCase() === 'q') {
      app.exit(0);
      return;
    }
    
    // Block Meta/Super/Windows key and all its combinations
    if (input.meta) {
      event.preventDefault();
      return;
    }
    
    // Block specific problematic keys
    const blockedKeys = ['Meta', 'Super', 'OS', 'ContextMenu', 'F1', 'F2', 'F3', 'F4', 
                         'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
    if (blockedKeys.includes(input.key)) {
      event.preventDefault();
      return;
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  // Disable all global shortcuts that might interfere
  app.on('browser-window-focus', () => {
    // Block common OS shortcuts
    globalShortcut.registerAll(['CommandOrControl+R', 'CommandOrControl+Shift+R', 'F5'], () => {
      // Refresh blocked
    });
    globalShortcut.register('F11', () => {
      // F11 blocked
    });
    globalShortcut.register('F12', () => {
      // F12 (DevTools) blocked
    });
    globalShortcut.register('CommandOrControl+W', () => {
      // Close window blocked
    });
    globalShortcut.register('CommandOrControl+Q', () => {
      // Quit blocked
    });
    globalShortcut.register('Alt+F4', () => {
      // Alt+F4 blocked
    });
    
    // Try to block Super/Meta/Windows key (platform-specific)
    // Note: This may not work on all systems due to OS-level handling
    try {
      globalShortcut.register('Super', () => {
        // Super key blocked
      });
      globalShortcut.register('Meta', () => {
        // Meta key blocked
      });
      // Block common Super key combinations
      globalShortcut.registerAll([
        'Super+D', 'Super+E', 'Super+L', 'Super+R', 'Super+S',
        'Super+Tab', 'Super+Space', 'Super+M', 'Super+A'
      ], () => {
        // Super combinations blocked
      });
    } catch (error) {
      // Some shortcuts may not be registerable on certain platforms
      console.log('Could not register all Super key shortcuts:', error.message);
    }
  });

  app.on('browser-window-blur', () => {
    globalShortcut.unregisterAll();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Prevent all windows from being closed
app.on('window-all-closed', (event) => {
  event.preventDefault();
});

// Allow quit only via our special key combo
app.on('before-quit', (event) => {
  // This is triggered by our special key combo in the renderer
});

