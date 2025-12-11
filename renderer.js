// Get DOM elements
const textEditor = document.getElementById('textEditor');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');

// ULTRA AGGRESSIVE: Block Meta/Super/Windows key at the earliest possible point
window.addEventListener('keydown', (event) => {
    if (event.metaKey || event.key === 'Meta' || event.key === 'Super' || event.key === 'OS') {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return false;
    }
}, { capture: true, passive: false });

window.addEventListener('keyup', (event) => {
    if (event.metaKey || event.key === 'Meta' || event.key === 'Super' || event.key === 'OS') {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return false;
    }
}, { capture: true, passive: false });

// List of keys that are allowed (printable characters and basic editing keys)
const allowedKeys = new Set([
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'Home',
    'End',
    'PageUp',
    'PageDown',
    'Enter',
    'Tab',
    'Space'
]);

// Keys that should be completely blocked (non-printable/special keys)
const blockedKeys = new Set([
    'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
    'Escape',
    'ContextMenu',
    'Meta', // Windows/Super key
    'OS',
    'Alt',
    'Control',
    'Shift', // Shift alone (shift+letter is ok)
    'CapsLock',
    'NumLock',
    'ScrollLock',
    'Pause',
    'Insert',
    'PrintScreen',
    'AudioVolumeUp',
    'AudioVolumeDown',
    'AudioVolumeMute',
    'MediaPlayPause',
    'MediaStop',
    'MediaTrackNext',
    'MediaTrackPrevious'
]);

// Capture all keyboard events
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Allow Ctrl+Alt+Shift+Q for exit (handled in main process)
    if (event.ctrlKey && event.altKey && event.shiftKey && key.toLowerCase() === 'q') {
        return; // Let it through to main process
    }
    
    // AGGRESSIVE: Block Meta/Super/Windows key IMMEDIATELY
    if (event.metaKey || key === 'Meta' || key === 'Super' || key === 'OS') {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return false;
    }
    
    // Block all other Ctrl combinations (Ctrl+C, Ctrl+V, Ctrl+A are allowed by default in textarea)
    // But we'll block dangerous ones
    if (event.ctrlKey || event.metaKey) {
        const blockedCombos = ['w', 'q', 'r', 'n', 't', 'f4'];
        if (blockedCombos.includes(key.toLowerCase())) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    }
    
    // Block Alt combinations (except our exit combo)
    if (event.altKey && !event.ctrlKey) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
    
    // Check if key is in blocked list
    if (blockedKeys.has(key)) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
    
    // Allow keys in allowed list
    if (allowedKeys.has(key)) {
        return true;
    }
    
    // Allow printable characters (letters, numbers, symbols)
    // Printable characters typically have length 1
    if (key.length === 1) {
        return true;
    }
    
    // Block everything else
    event.preventDefault();
    event.stopPropagation();
    return false;
}, true); // Use capture phase for earlier interception

// Also capture keyup and keypress for extra safety
document.addEventListener('keyup', (event) => {
    // Block Meta key aggressively
    if (event.metaKey || event.key === 'Meta' || event.key === 'Super' || event.key === 'OS') {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return false;
    }
    
    if (blockedKeys.has(event.key) && event.key !== 'Shift' && event.key !== 'Control' && event.key !== 'Alt') {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
}, true);

document.addEventListener('keypress', (event) => {
    const key = event.key;
    
    // Block Meta key aggressively
    if (event.metaKey || key === 'Meta' || key === 'Super' || key === 'OS') {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return false;
    }
    
    // Block if it's a blocked key
    if (blockedKeys.has(key)) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
}, true);

// Prevent context menu (right-click)
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    return false;
});

// Update character and word count
textEditor.addEventListener('input', () => {
    updateStats();
});

function updateStats() {
    const text = textEditor.value;
    const chars = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    
    charCount.textContent = `Characters: ${chars}`;
    wordCount.textContent = `Words: ${words}`;
}

// Keep focus on the text editor always
textEditor.focus();

// If focus is lost, bring it back
document.addEventListener('blur', () => {
    setTimeout(() => textEditor.focus(), 0);
}, true);

window.addEventListener('blur', () => {
    setTimeout(() => textEditor.focus(), 0);
});

// Prevent any attempts to leave the page
window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = '';
    return '';
});

// Initialize stats
updateStats();

// Keep the cursor in the editor
setInterval(() => {
    if (document.activeElement !== textEditor) {
        textEditor.focus();
    }
}, 100);

// ====== FONT SIZE CONTROL ======
const fontSizes = [1, 1.5, 2, 3, 4, 5, 6, 7, 8];
let currentFontSizeIndex = 8; // Default: 8rem (index 8) - MAXIMUM SIZE!

const fontBigger = document.getElementById('fontBigger');
const fontSmaller = document.getElementById('fontSmaller');
const fontSizeDisplay = document.getElementById('fontSizeDisplay');

function updateFontSize() {
    const fontSize = fontSizes[currentFontSizeIndex];
    textEditor.style.fontSize = `${fontSize}rem`;
    fontSizeDisplay.textContent = currentFontSizeIndex + 1;
    
    // Disable buttons at limits
    fontSmaller.disabled = currentFontSizeIndex === 0;
    fontBigger.disabled = currentFontSizeIndex === fontSizes.length - 1;
    
    if (fontSmaller.disabled) {
        fontSmaller.style.opacity = '0.5';
        fontSmaller.style.cursor = 'not-allowed';
    } else {
        fontSmaller.style.opacity = '1';
        fontSmaller.style.cursor = 'pointer';
    }
    
    if (fontBigger.disabled) {
        fontBigger.style.opacity = '0.5';
        fontBigger.style.cursor = 'not-allowed';
    } else {
        fontBigger.style.opacity = '1';
        fontBigger.style.cursor = 'pointer';
    }
}

fontBigger.addEventListener('click', () => {
    if (currentFontSizeIndex < fontSizes.length - 1) {
        currentFontSizeIndex++;
        updateFontSize();
    }
    textEditor.focus();
});

fontSmaller.addEventListener('click', () => {
    if (currentFontSizeIndex > 0) {
        currentFontSizeIndex--;
        updateFontSize();
    }
    textEditor.focus();
});

updateFontSize();

// ====== TEXT CASE CONTROL ======
let textCaseMode = 'upper'; // 'normal', 'upper', 'lower' - DEFAULT: UPPERCASE!

const caseNormal = document.getElementById('caseNormal');
const caseUpper = document.getElementById('caseUpper');
const caseLower = document.getElementById('caseLower');

function updateCaseButtons() {
    caseNormal.classList.remove('active');
    caseUpper.classList.remove('active');
    caseLower.classList.remove('active');
    
    if (textCaseMode === 'normal') {
        caseNormal.classList.add('active');
        textEditor.style.textTransform = 'none';
    } else if (textCaseMode === 'upper') {
        caseUpper.classList.add('active');
        textEditor.style.textTransform = 'uppercase';
    } else if (textCaseMode === 'lower') {
        caseLower.classList.add('active');
        textEditor.style.textTransform = 'lowercase';
    }
}

caseNormal.addEventListener('click', () => {
    textCaseMode = 'normal';
    updateCaseButtons();
    textEditor.focus();
});

caseUpper.addEventListener('click', () => {
    textCaseMode = 'upper';
    updateCaseButtons();
    textEditor.focus();
});

caseLower.addEventListener('click', () => {
    textCaseMode = 'lower';
    updateCaseButtons();
    textEditor.focus();
});

updateCaseButtons();

console.log('Keyboard Fun loaded! Press Ctrl+Alt+Shift+Q to exit.');

