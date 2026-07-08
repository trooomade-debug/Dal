# Birthday Website Prompt - Girly iPod Theme

## Overview
Create a simple, romantic birthday website with a girly old iPod theme. The site features an iPod-inspired interface where clicking on different areas displays romantic birthday messages.

## Features
- iPod-inspired design with click wheel and screen
- Girly color scheme (pinks, purples, whites)
- Interactive elements that show romantic messages when clicked
- Animated heart pulse and progress bar
- Responsive design

## Files to Create

### 1. index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Happy Birthday My Love</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="ipod">
        <div class="click-wheel">
            <div class="wheel-ring"></div>
            <div class="wheel-center">
                <div class="menu-button">Menu</div>
            </div>
        </div>
        <div class="screen">
            <div class="status-bar">
                <div class="battery">&#9789;</div>
                <div class="time">12:00</div>
            </div>
            <div class="content">
                <div class="album-art">
                    <div class="heart-pulse"></div>
                </div>
                <div class="track-info">
                    <div class="track-title">Happy Birthday</div>
                    <div class="artist-name">My Love</div>
                </div>
                <div class="progress-bar">
                    <div class="progress"></div>
                </div>
            </div>
            <div class="nav-buttons">
                <button class="nav-button prev">&#9664;</button>
                <button class="nav-button play">&#9658;</button>
                <button class="nav-button next">&#9654;</button>
            </div>
        </div>
    </div>
    <div class="romantic-prompts">
        <div class="prompt-message" id="prompt1">You're the melody to my heart ❤️</div>
        <div class="prompt-message" id="prompt2">Happy Birthday to my gorgeous girlfriend!</div>
        <div class="prompt-message" id="prompt3">Every day with you is a gift</div>
        <div class="prompt-message" id="prompt4">You make my world brighter</div>
        <div class="prompt-message" id="prompt5">I love you more than words can say</div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### 2. style.css
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: linear-gradient(135deg, #ffe6f0, #ffe6f0);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    padding: 20px;
}

.ipod {
    position: relative;
    width: 220px;
    height: 380px;
    background: linear-gradient(145deg, #e0e0e0, #f5f5f5);
    border-radius: 20px;
    box-shadow:
        0 10px 30px rgba(0,0,0,0.3),
        inset 0 2px 5px rgba(255,255,255,0.6),
        inset 0 -2px 5px rgba(0,0,0,0.1);
    overflow: hidden;
    border: 2px solid #c0c0c0;
}

/* Click Wheel */
.click-wheel {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 120px;
    background: linear-gradient(145deg, #d4d4d4, #e8e8e8);
    border-radius: 50%;
    box-shadow:
        inset 0 2px 5px rgba(0,0,0,0.2),
        0 2px 5px rgba(0,0,0,0.2);
    border: 2px solid #b0b0b0;
    overflow: hidden;
}

.wheel-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    border: 2px solid #c0c0c0;
    border-radius: 50%;
}

.wheel-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    background: linear-gradient(145deg, #c0c0c0, #d4d4d4);
    border-radius: 50%;
    box-shadow: inset 0 2px 5px rgba(0,0,0,0.2);
    display: flex;
    justify-content: center;
    align-items: center;
}

.menu-button {
    background: #ff69b4;
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    font-size: 14px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    transition: all 0.2s;
}

.menu-button:hover {
    background: #ff1493;
    transform: scale(1.1);
}

/* Screen */
.screen {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 180px;
    height: 200px;
    background: #000;
    border-radius: 10px;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
    overflow:hidden;
    border: 2px solid #333;
}

/* Status Bar */
.status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20px;
    padding: 0 10px;
    color: #fff;
    font-size: 14px;
}

.battery, .time {
    color: #ff69b4;
}

/* Album Art */
.album-art {
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle at center, #ff69b4, #ff1493);
}

.heart-pulse {
    width: 40px;
    height: 40px;
    background: #ff1493;
    border-radius: 50%;
    position: relative;
    animation: pulse 1.5s infinite;
}

.heart-pulse::before,
.heart-pulse::after {
    content: "";
    position: absolute;
    top: -50%;
    left: 50%;
    width: 20px;
    height: 35px;
    background: #ff1493;
    border-radius: 50% 50% 0 0;
    transform: rotate(-45deg) translate(-50%, 0);
}

.heart-pulse::after {
    transform: rotate(45deg) translate(-50%, 0);
}

@keyframes pulse {
    0% { transform: scale(1); opacity: 0.9; }
    50% { transform: scale(1.1); opacity: 0.7; }
    100% { transform: scale(1); opacity: 0.9; }
}

/* Track Info */
.track-info {
    color: #fff;
    text-align: center;
    margin-top: 10px;
}

.track-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
}

.artist-name {
    font-size: 14px;
    opacity: 0.8;
}

/* Progress Bar */
.progress-bar {
    width: 80%;
    height: 4px;
    background: #333;
    margin: 20px auto;
    border-radius: 2px;
    overflow: hidden;
}

.progress {
    height: 100%;
    background: linear-gradient(90deg, #ff69b4, #ff1493);
    width: 0;
    transition: width 0.5s ease;
}

/* Nav Buttons */
.nav-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
}

.nav-button {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    background: #ff69b4;
    color: white;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    transition: all 0.2s;
}

.nav-button:hover {
    background: #ff1493;
    transform: scale(1.1);
}

.nav-button.play {
    width: 35px;
    height: 35px;
    font-size: 18px;
}

/* Romantic Prompts */
.romantic-prompts {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 300px;
    text-align: center;
    z-index: 10;
}

.prompt-message {
    background: rgba(255, 255, 255, 0.9);
    color: #ff1493;
    padding: 10px 15px;
    margin: 5px 0;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
    pointer-events: none;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
}

.prompt-message.active {
    opacity: 1;
    transform: translateY(0);
}

/* Responsive */
@media (max-width: 480px) {
    .ipod {
        width: 180px;
        height: 320px;
    }

    .click-wheel {
        width: 100px;
        height: 100px;
    }

    .wheel-ring {
        width: 80px;
        height: 80px;
    }

    .wheel-center {
        width: 30px;
        height: 30px;
    }

    .screen {
        width: 150px;
        height: 160px;
        top: 25px;
    }

    .album-art {
        height: 100px;
    }

    .track-title {
        font-size: 16px;
    }

    .artist-name {
        font-size: 12px;
    }

    .nav-buttons {
        margin-top: 12px;
    }

    .nav-button {
        width: 25px;
        height: 25px;
        font-size: 14px;
    }

    .nav-button.play {
        width: 30px;
        height: 30px;
        font-size: 16px;
    }
}
```

### 3. script.js
```javascript
document.addEventListener('DOMContentLoaded', function() {
    const messages = [
        "You're the melody to my heart ❤️",
        "Happy Birthday to my gorgeous girlfriend!",
        "Every day with you is a gift",
        "You make my world brighter",
        "I love you more than words can say",
        "You're my forever and always",
        "Today we celebrate YOU, my love",
        "You make my heart skip a beat",
        "I'm so lucky to call you mine",
        "You're beautiful inside and out"
    ];

    const promptElements = document.querySelectorAll('.prompt-message');
    let currentMessageIndex = 0;

    // Show a random romantic message when clicking on screen areas
    document.querySelector('.screen').addEventListener('click', function(e) {
        // Avoid triggering when clicking buttons
        if (e.target.closest('.nav-button') || e.target.closest('.menu-button')) {
            return;
        }

        showRandomMessage();
    });

    // Show message when clicking menu button
    document.querySelector('.menu-button').addEventListener('click', function(e) {
        e.stopPropagation();
        showRandomMessage();
    });

    // Show message when clicking play button
    document.querySelector('.nav-button.play').addEventListener('click', function(e) {
        e.stopPropagation();
        showRandomMessage();

        // Animate progress bar
        const progress = document.querySelector('.progress');
        progress.style.width = '100%';
        setTimeout(() => {
            progress.style.width = '0';
        }, 3000);
    });

    function showRandomMessage() {
        // Hide all messages first
        promptElements.forEach(el => {
            el.classList.remove('active');
        });

        // Pick a random message
        const randomIndex = Math.floor(Math.random() * messages.length);
        const messageEl = promptElements[randomIndex % promptElements.length];
        messageEl.textContent = messages[randomIndex];
        messageEl.classList.add('active');

        // Hide after 3 seconds
        setTimeout(() => {
            messageEl.classList.remove('active');
        }, 3000);
    }

    // Auto-show a message when page loads
    setTimeout(showRandomMessage, 1500);
});
```

## How to Use
1. Create a new folder for your project
2. Create the three files above (index.html, style.css, script.js) in that folder
3. Open index.html in any web browser to see the birthday website
4. Click on the screen, menu button, or play button to see romantic messages
5. Customize the messages in the JavaScript array if desired

## Customization Ideas
- Change the colors in the CSS to match your girlfriend's favorite colors
- Add more romantic messages to the JavaScript array
- Replace the heart pulse with a photo of you two
- Add birthday music that plays when the play button is clicked
- Add more interactive elements like a "photos" menu that shows pictures

## Technical Notes
- The site uses pure HTML/CSS/JavaScript - no frameworks needed
- Responsive design works on mobile and desktop
- All animations use CSS transitions for smooth performance
- Messages appear with fade-in/fade-out effects for a polished feel