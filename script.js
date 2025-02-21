// Authorized Users
const authorizedUsers = {
    'Gesualdo': '#290507',
    'Daniele': '#250709',
    'Marco': '#140225',
    'Giuseppe': '#010195',
    'Alessandro': '#231289',
    'Francesco': '#170398',
    'Lorenzo': '#080497',
    'Matteo': '#120901'
};

// Login Functions
function showAdvancedLogin() {
    document.querySelector('.login-buttons').style.display = 'none';
    document.getElementById('advanced-login').style.display = 'block';
    document.getElementById('backButton').style.display = 'flex';
}

function guestAccess() {
    document.querySelector('.login-container').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('welcomeMessage').textContent = 'BE THE 1%';
    document.getElementById('upgradeBtn').style.display = 'flex';
}

function validateLogin() {
    const nickname = document.getElementById('nickname').value;
    const hashcode = document.getElementById('hashcode').value;
    
    if (authorizedUsers[nickname] && authorizedUsers[nickname] === hashcode) {
        const day = hashcode.substring(1, 3);
        const month = hashcode.substring(3, 5);
        const birthday = `${day}/${month}`;
        
        const today = new Date();
        const currentDay = String(today.getDate()).padStart(2, '0');
        const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
        const currentDate = `${currentDay}/${currentMonth}`;
        
        document.getElementById('welcomeMessage').textContent = 
            birthday === currentDate ? 
            `Buon compleanno ${nickname}! 🎉🎂` : 
            `Benvenuto, ${nickname}!`;
        
        document.getElementById('upgradeBtn').style.display = 'none';
        document.querySelector('.login-container').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    } else {
        showError();
    }
}

function showError() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-popup';
    errorDiv.textContent = 'ERROR 404: Password o/e nickname errato/i';
    document.querySelector('.login-box').appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
}

function resetView() {
    document.querySelector('.login-buttons').style.display = 'flex';
    document.getElementById('advanced-login').style.display = 'none';
    document.getElementById('backButton').style.display = 'none';
}

// Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Section Highlighting and Navigation
    const sections = document.querySelectorAll('.content-section');
    const navLinksItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('current');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('current');
            }
        });
    });

    // Smooth Scrolling
    navLinksItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');

            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Password Toggle
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('hashcode');
    
    togglePassword.addEventListener('click', () => {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye-slash');
    });

    // Card Scrolling
    const cardContainer = document.querySelector('.exclusive-cards');
    
    let startX;
    let startY;
    let initialScrollLeft;
    let isScrollingHorizontally = false;
    
    cardContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
        initialScrollLeft = cardContainer.scrollLeft;
        isScrollingHorizontally = false;
    });
    
    cardContainer.addEventListener('touchmove', (e) => {
        if (e.touches.length !== 1) return;
        
        const x = e.touches[0].pageX;
        const y = e.touches[0].pageY;
        const deltaX = startX - x;
        const deltaY = startY - y;
        
        if (!isScrollingHorizontally && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
            isScrollingHorizontally = Math.abs(deltaX) > Math.abs(deltaY);
        }
        
        if (isScrollingHorizontally) {
            e.preventDefault();
            cardContainer.scrollLeft = initialScrollLeft + deltaX;
        }
    });
    
    cardContainer.addEventListener('touchend', () => {
        const cardWidth = cardContainer.offsetWidth * 0.9;
        const scrollPos = cardContainer.scrollLeft;
        const targetScroll = Math.round(scrollPos / cardWidth) * cardWidth;
        
        cardContainer.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    });

    // Upgrade Button
    document.getElementById('upgradeBtn').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('beAdvanced').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY + 200;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const currentId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('current');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('current');
                }
            });
        }
    });
});
