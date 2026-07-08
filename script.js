document.addEventListener('DOMContentLoaded', function() {
    const state = {
        currentView: 'hey',
        views: ['hey', 'fun'],
        viewIndex: 0,
        heyIndex: 0,
        isRotating: false,
        lastTouchX: 0,
        lastTouchY: 0,
        rotationOffset: 0,
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

    const wheel = document.querySelector('.click-wheel');
    const wheelRing = document.querySelector('.wheel-ring');
    const wheelCenter = document.querySelector('.wheel-center');
    const views = {
        hey: document.getElementById('hey-view'),
        fun: document.getElementById('fun-view')
    };
    const messageText = document.querySelector('.message-text');
    const messageIndicators = document.querySelectorAll('.indicator');
    const progressBar = document.querySelector('.progress');
    const prevBtn = document.querySelector('.nav-button.prev');
    const playBtn = document.querySelector('.nav-button.play');
    const nextBtn = document.querySelector('.nav-button.next');
    const statusTime = document.querySelector('.time');
    const statusDate = document.querySelector('.date');
    const batteryIcon = document.querySelector('.battery');
    const screen = document.querySelector('.screen');

    function init() {
        updateClock();
        setInterval(updateClock, 10000);
        setBatteryLevel();
        showView(state.currentView);
        setupWheelInteraction();
        prevBtn.addEventListener('click', () => navigateView(-1));
        nextBtn.addEventListener('click', () => navigateView(1));
        playBtn.addEventListener('click', handlePlayButton);
        screen.addEventListener('click', handleScreenClick);
        document.querySelector('.menu-button').addEventListener('click', handleMenuClick);
        setInterval(createSparkle, 8000);
    }

    function updateClock() {
        const now = new Date();
        statusTime.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        statusDate.textContent = now.toLocaleDateString('en-US', {month: 'short', day: '2-digit'}).toUpperCase();
    }

    function setBatteryLevel() {
        const level = Math.floor(Math.random() * 20) + 80;
        batteryIcon.textContent = level >= 90 ? '&#9789;' : level >= 70 ? '&#9788;' : '&#9787;';
        setTimeout(setBatteryLevel, 300000);
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

    function handleMenuClick(e) {
        e.stopPropagation(); // Prevent triggering screen click
        showMessageForCurrentView();
    }

    function handlePlayButton() {
        showMessageForCurrentView();
        animateProgress();
        playBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            playBtn.style.transform = 'scale(1)';
        }, 100);
    }

    function navigateView(direction) {
        const newIndex = (state.viewIndex + direction + state.views.length) % state.views.length;
        state.viewIndex = newIndex;
        showView(state.views[newIndex]);
        rotateWheelToIndex(newIndex);
    }

    function animateProgress() {
        progressBar.style.width = '100%';
        setTimeout(() => {
            progressBar.style.width = '0';
        }, 1500);
    }

    function setupWheelInteraction() {
        let isDragging = false;
        let startAngle = 0;
        let currentRotation = 0;

        wheel.addEventListener('mousedown', startDrag);
        wheel.addEventListener('touchstart', startDrag, {passive: true});
        window.addEventListener('mousemove', drag);
        window.addEventListener('touchmove', drag, {passive: true});
        window.addEventListener('mouseup', endDrag);
        window.addEventListener('touchend', endDrag);
        window.addEventListener('mouseleave', endDrag);

        function startDrag(e) {
            isDragging = true;
            const rect = wheel.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            let clientX, clientY;
            if (e.type === 'touchstart') {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            startAngle = Math.atan2(clientY - centerY, clientX - centerX) * 180 / Math.PI;
            e.preventDefault();
        }

        function drag(e) {
            if (!isDragging) return;

            let clientX, clientY;
            if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            const rect = wheel.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const currentAngle = Math.atan2(clientY - centerY, clientX - centerX) * 180 / Math.PI;
            const angleDiff = currentAngle - startAngle;

            currentRotation = (state.rotationOffset + angleDiff) % 360;
            if (currentRotation < 0) currentRotation += 360;

            wheelRing.style.transform = `rotate(${currentRotation}deg)`;

            const anglePerView = 360 / state.views.length;
            const newViewIndex = Math.floor((currentRotation + anglePerView/2) % 360 / anglePerView);

            if (newViewIndex !== state.viewIndex) {
                state.viewIndex = newViewIndex;
                showView(state.views[newViewIndex]);
            }

            e.preventDefault();
        }

        function endDrag() {
            if (!isDragging) return;
            isDragging = false;
            state.rotationOffset = currentRotation;
            snapToView();
            e.preventDefault();
        }

        function snapToView() {
            const anglePerView = 360 / state.views.length;
            const snappedAngle = Math.round(state.rotationOffset / anglePerView) * anglePerView;
            state.rotationOffset = snappedAngle % 360;

            wheelRing.style.transition = 'transform 0.3s ease-out';
            wheelRing.style.transform = `rotate(${state.rotationOffset}deg)`;

            setTimeout(() => {
                wheelRing.style.transition = '';
                const viewIndex = Math.floor((state.rotationOffset + anglePerView/2) % 360 / anglePerView);
                if (viewIndex !== state.viewIndex) {
                    state.viewIndex = viewIndex;
                    showView(state.views[viewIndex]);
                }
            }, 300);
        }

        rotateWheelToIndex(state.viewIndex);
    }

    function rotateWheelToIndex(index) {
        const anglePerView = 360 / state.views.length;
        const targetAngle = index * anglePerView;
        state.rotationOffset = targetAngle;

        wheelRing.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
        wheelRing.style.transform = `rotate(${targetAngle}deg)`;

        setTimeout(() => {
            wheelRing.style.transition = '';
        }, 400);
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