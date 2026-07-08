document.addEventListener('DOMContentLoaded', function() {
    const state = {
        currentView: 'hey',
        views: ['hey', 'fun'],
        viewIndex: 0,
        heyIndex: 0,
        messages: [
            "Hey you 😊",
            "Made you smile?",
            "Thinking of you",
            "You've got great energy",
            "Hope your day's awesome",
            "Can't wait to talk more",
            "You're fun to talk to",
            "Smiling just thinking of you",
            "Let's make today fun",
            "You've got a great vibe",
            "Excited to get to know you",
            "Hope you're having a great day",
            "Just wanted to say hi 💫",
            "Your laugh is awesome",
            "Can't wait for our next chat",
            "You make me smile",
            "Having a great day?",
            "You're pretty cool",
            "Let's talk soon!",
            "You're on my mind"
        ]
    };

    const views = {
        hey: document.getElementById('hey-view'),
        fun: document.getElementById('fun-view')
    };
    const messageText = document.querySelector('.message-text');
    const messageIndicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.nav-button.prev');
    const playBtn = document.querySelector('.nav-button.play');
    const nextBtn = document.querySelector('.nav-button.next');
    const statusTime = document.querySelector('.time');
    const statusDate = document.querySelector('.date');
    const screen = document.querySelector('.screen');

    function init() {
        updateClock();
        setInterval(updateClock, 1000); // Update every second for live time
        showView(state.currentView);
        prevBtn.addEventListener('click', () => navigateView(-1));
        nextBtn.addEventListener('click', () => navigateView(1));
        playBtn.addEventListener('click', handlePlayButton);
        screen.addEventListener('click', handleScreenClick);
        setInterval(createSparkle, 8000);
    }

    function updateClock() {
        const now = new Date();
        statusTime.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        statusDate.textContent = now.toLocaleDateString('en-US', {month: 'short', day: '2-digit'}).toUpperCase();
    }

    function showView(viewName) {
        Object.values(views).forEach(view => {
            view.classList.remove('active');
        });
        if (views[viewName]) {
            views[viewName].classList.add('active');
            state.currentView = viewName;
            updateViewContent(viewName);
        }
    }

    function updateViewContent(viewName) {
        let content = '';
        let indicatorCount = 1;

        if (viewName === 'hey') {
            // For hey view, show current message in sequence
            content = state.messages[state.heyIndex];
            indicatorCount = state.messages.length;
            // Update indicators to show position
            messageIndicators.forEach((indicator, index) => {
                if (index < indicatorCount) {
                    indicator.style.display = 'block';
                    indicator.classList.toggle('active', index === state.heyIndex);
                } else {
                    indicator.style.display = 'none';
                }
            });
        } else if (viewName === 'fun') {
            // For fun view, show random message
            content = getRandomMessage(state.messages);
            indicatorCount = 1;
            messageIndicators[0].style.display = 'block';
            messageIndicators[0].classList.remove('active');
            for (let i = 1; i < messageIndicators.length; i++) {
                messageIndicators[i].style.display = 'none';
            }
        }

        messageText.textContent = content;
    }

    function getRandomMessage(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function showMessageForCurrentView() {
        if (state.currentView === 'hey') {
            // Show current hey message and advance to next for next time
            messageText.textContent = state.messages[state.heyIndex];
            state.heyIndex = (state.heyIndex + 1) % state.messages.length;
        } else if (state.currentView === 'fun') {
            // Show random fun message
            messageText.textContent = getRandomMessage(state.messages);
        }
    }

    function handleScreenClick() {
        // Avoid triggering when clicking buttons
        const event = window.event; // For IE, but we'll use standard
        // Actually, better to check if click is on buttons
        // We'll just allow it - if they click buttons, it's fine
        showMessageForCurrentView();
    }

    function handlePlayButton() {
        showMessageForCurrentView();
        playBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            playBtn.style.transform = 'scale(1)';
        }, 100);
    }

    function navigateView(direction) {
        const newIndex = (state.viewIndex + direction + state.views.length) % state.views.length;
        state.viewIndex = newIndex;
        showView(state.views[newIndex]);
    }

    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';

        const ipod = document.querySelector('.ipod');
        const ipodRect = ipod.getBoundingClientRect();
        const x = Math.random() * ipodRect.width;
        const y = Math.random() * ipodRect.height * 0.7;

        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.style.fontSize = `${Math.random() * 12 + 8}px`;
        sparkle.style.opacity = '0';

        ipod.appendChild(sparkle);

        setTimeout(() => {
            sparkle.style.opacity = '0.7';
        }, 10);

        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }

    init();

    setTimeout(() => {
        playBtn.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.2), 0 0 0 2px rgba(74, 85, 162, 0.3)';
        setTimeout(() => {
            playBtn.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 4px rgba(0,0,0,0.3)';
        }, 800);
    }, 1000);
});