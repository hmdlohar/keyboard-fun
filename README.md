# ✨ Keyboard Fun

A safe, kid-friendly text editor that captures **all keyboard input** to prevent accidental system interactions. Perfect for toddlers and young children who love to play with the keyboard!

## 🎯 Purpose

When kids play with regular text editors (Word, Notepad, etc.), they often press special keys like:
- **Windows/Super key** → Opens start menu
- **Alt+Tab** → Switches windows
- **Context Menu key** → Opens menus
- **F1-F12** → Triggers various actions
- **Ctrl+W** → Closes windows

**Keyboard Fun** blocks all these keys and keeps your kid safely inside the app, typing away happily! 🎉

## ✨ Features

### 🔒 Complete Keyboard Hijacking
- **Blocks ALL special keys**: Windows key, Alt+Tab, F-keys, Insert, Context Menu, etc.
- **True kiosk mode**: Fullscreen with no escape routes
- **Safe exit**: Only `Ctrl+Alt+Shift+Q` closes the app (impossible for kids to press accidentally)

### 📝 Text Editor Features
- **Huge text**: Default 8rem font size (GIANT letters!)
- **Font size control**: 9 levels from tiny to massive
- **Text case options**: Normal, UPPERCASE, or lowercase
- **Live stats**: Character and word count
- **Beautiful UI**: Kid-friendly colorful gradient design

### 🎨 Customization
- **Font Size Buttons**: A- and A+ to adjust
- **Case Buttons**: Switch between Normal/UPPER/lower
- **Real-time updates**: Changes apply instantly

### ⚙️ Default Settings
- Font Size: **8rem** (maximum size!)
- Text Case: **UPPERCASE**
- All special keys blocked
- Auto-focus on text area

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh/) installed on your system

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/keyboard-fun.git
cd keyboard-fun

# Install dependencies
bun install

# Run the app
bun start
```

## 🎮 Usage

1. **Launch the app** - It opens in fullscreen kiosk mode
2. **Let your kid type** - All special keys are blocked
3. **Adjust settings** (optional):
   - Click **A-** or **A+** to change font size
   - Click **Normal**, **UPPER**, or **lower** to change text case
4. **To exit**: Press `Ctrl + Alt + Shift + Q` together

### Controls

| Control | Function |
|---------|----------|
| **A-** button | Decrease font size |
| **A+** button | Increase font size |
| **Normal** button | Mixed case typing |
| **UPPER** button | Force UPPERCASE |
| **lower** button | Force lowercase |
| **Ctrl+Alt+Shift+Q** | Exit application |

### Allowed Keys
- ✅ All letters (a-z, A-Z)
- ✅ All numbers (0-9)
- ✅ All symbols/punctuation
- ✅ Space, Enter, Tab
- ✅ Backspace, Delete
- ✅ Arrow keys, Home, End, PageUp, PageDown
- ✅ Basic editing shortcuts (Ctrl+C, Ctrl+V, Ctrl+A, Ctrl+Z)

### Blocked Keys
- ❌ Windows/Super key
- ❌ Alt+Tab
- ❌ Context Menu key
- ❌ F1-F12 function keys
- ❌ Insert, PrintScreen, Pause
- ❌ Alt+F4, Ctrl+W, Ctrl+Q
- ❌ Escape (in kiosk mode)
- ❌ All media keys
- ❌ All dangerous shortcuts

## 🏗️ Building

### Build Locally

```bash
# Build for your current platform
bun run build

# Build for Windows
bun run build:win

# Build for Linux
bun run build:linux

# Build for both
bun run build:all
```

Builds will be in the `dist/` folder:
- **Windows**: `.exe` installer, portable `.exe`
- **Linux**: `.AppImage`, `.deb` package

### GitHub Actions Auto-Build

The project includes GitHub Actions workflow for automatic builds.

#### Automatic Release (on version tags)

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0
```

GitHub Actions will automatically:
1. Build Windows and Linux versions
2. Create a GitHub Release
3. Upload all binaries
4. Generate release notes

#### Manual Build

1. Go to GitHub → **Actions** tab
2. Select **"Build and Release"** workflow
3. Click **"Run workflow"**
4. Download artifacts from the workflow run

### Download Pre-built Binaries

Once released, download from the [Releases](https://github.com/YOUR_USERNAME/keyboard-fun/releases) page:
- **Windows**: `Keyboard-Fun-Setup-x.x.x.exe` or `Keyboard-Fun-x.x.x.exe` (portable)
- **Linux**: `Keyboard-Fun-x.x.x.AppImage` or `keyboard-fun_x.x.x_amd64.deb`

## 🛠️ Tech Stack

- **[Electron](https://www.electronjs.org/)** - Cross-platform desktop framework
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime & package manager
- **[electron-builder](https://www.electron.build/)** - Build & package tool
- **HTML/CSS/JavaScript** - Simple, fast UI
- **GitHub Actions** - Automated CI/CD

## 📁 Project Structure

```
keyboard-fun/
├── .github/
│   └── workflows/
│       └── build.yml          # GitHub Actions workflow
├── main.js                    # Electron main process (kiosk mode)
├── preload.js                 # Security bridge
├── renderer.js                # Keyboard handling & UI logic
├── index.html                 # UI structure
├── styles.css                 # Styling
├── package.json               # Dependencies & scripts
├── bunfig.toml                # Bun configuration
└── .gitignore                 # Git ignore rules
```

## 🔒 Security

- **Context Isolation**: Enabled for security
- **Node Integration**: Disabled in renderer
- **Preload Script**: Secure bridge between main and renderer
- **No Remote Content**: All resources are local

## 🐧 Linux Notes

On some Linux desktop environments (GNOME, KDE), the Super/Windows key might still trigger the activities overview because it's handled at the compositor level.

**Temporary workaround (GNOME)**:
```bash
# Disable Super key overlay
gsettings set org.gnome.mutter overlay-key ''

# To restore later
gsettings reset org.gnome.mutter overlay-key
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 👨‍👩‍👧 For Parents

This app was created to let kids safely explore typing without accidentally:
- Closing important windows
- Opening system menus
- Switching applications
- Triggering shortcuts

It's educational, safe, and fun! 🎉

## ⚠️ Troubleshooting

### App won't close
- Make sure you're pressing **all four keys** together: `Ctrl + Alt + Shift + Q`
- On some keyboards, try pressing Ctrl and Alt first, then add Shift, then Q

### Text is too small/big
- Use the **A-** and **A+** buttons to adjust
- The app remembers your preference during the session

### Super/Windows key still works (Linux)
- See the [Linux Notes](#-linux-notes) section above
- The compositor may intercept it before Electron can

## 🙏 Acknowledgments

Built with ❤️ for kids who love keyboards!

---

**Made with Electron + Bun** ⚡
