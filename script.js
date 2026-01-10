// ===== Particles Background =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ===== Mobile Menu =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    });
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats')) {
                animateCounters();
            }
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.stats, .feature-card, .download-card').forEach(el => {
    observer.observe(el);
});

// ===== Version Selector =====
const versionDropdown = document.getElementById('versionDropdown');
const versionSelected = document.getElementById('versionSelected');
const versionOptions = document.getElementById('versionOptions');
const versionText = versionSelected.querySelector('.version-text');

let selectedVersion = '1.21.4';

versionSelected.addEventListener('click', () => {
    versionDropdown.classList.toggle('open');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!versionDropdown.contains(e.target)) {
        versionDropdown.classList.remove('open');
    }
});

// Handle version selection
document.querySelectorAll('.version-option').forEach(option => {
    option.addEventListener('click', () => {
        // Remove selected class from all options
        document.querySelectorAll('.version-option').forEach(opt => {
            opt.classList.remove('selected');
        });

        // Add selected class to clicked option
        option.classList.add('selected');

        // Update selected version
        selectedVersion = option.getAttribute('data-version');
        versionText.textContent = selectedVersion;

        // Close dropdown
        versionDropdown.classList.remove('open');
    });
});

// ===== Download Modal =====
const downloadModal = document.getElementById('downloadModal');
const modalClose = document.getElementById('modalClose');
const downloadProgress = document.getElementById('downloadProgress');
const downloadOS = document.getElementById('downloadOS');
const downloadVersion = document.getElementById('downloadVersion');
const downloadButtons = document.querySelectorAll('.btn-download');

// The same download file for all versions - replace with your actual download URL
const DOWNLOAD_URL = 'https://github.com/InterSpaceStudios/BlockForge/releases/download/v1.0/BlockForge.zip';

function showDownloadModal(os) {
    const osNames = {
        'windows': 'Windows',
        'mac': 'macOS',
        'linux': 'Linux'
    };

    downloadOS.textContent = `Block Forge for ${osNames[os]}`;
    downloadVersion.textContent = `Minecraft ${selectedVersion}`;
    downloadModal.classList.add('active');

    // Animate progress bar
    let progress = 0;
    downloadProgress.style.width = '0%';

    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);

            // Trigger actual download after animation completes
            setTimeout(() => {
                triggerDownload();
            }, 500);
        }
        downloadProgress.style.width = progress + '%';
    }, 200);
}

function triggerDownload() {
    // Create a temporary link and click it to trigger download
    // All versions download the same file (ZIP containing the installer)
    const link = document.createElement('a');
    link.href = DOWNLOAD_URL;
    link.download = `BlockForge-${selectedVersion}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function closeModal() {
    downloadModal.classList.remove('active');
    downloadProgress.style.width = '0%';
}

downloadButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const os = btn.getAttribute('data-os');
        showDownloadModal(os);
    });
});

modalClose.addEventListener('click', closeModal);

downloadModal.addEventListener('click', (e) => {
    if (e.target === downloadModal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.9)';
    }
});

// ===== Feature Cards Hover Effect =====
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Keyboard Navigation for Version Dropdown =====
versionSelected.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        versionDropdown.classList.toggle('open');
    } else if (e.key === 'Escape') {
        versionDropdown.classList.remove('open');
    }
});

// ===== Error Modal for Unavailable Links =====
const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');
const errorModalClose = document.getElementById('errorModalClose');
const errorModalOk = document.getElementById('errorModalOk');

function showErrorModal(message) {
    errorMessage.textContent = message;
    errorModal.classList.add('active');
}

function closeErrorModal() {
    errorModal.classList.remove('active');
}

// Handle unavailable link clicks
document.querySelectorAll('.unavailable-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const message = link.getAttribute('data-message') || 'Sorry, this feature is not available right now.';
        showErrorModal(message);
    });
});

// Close error modal events
if (errorModalClose) {
    errorModalClose.addEventListener('click', closeErrorModal);
}

if (errorModalOk) {
    errorModalOk.addEventListener('click', closeErrorModal);
}

if (errorModal) {
    errorModal.addEventListener('click', (e) => {
        if (e.target === errorModal) {
            closeErrorModal();
        }
    });
}

// Close error modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && errorModal && errorModal.classList.contains('active')) {
        closeErrorModal();
    }
});

// ===== Console Easter Egg =====
console.log('%c🎮 Block Forge Client', 'font-size: 24px; font-weight: bold; color: #00ff88;');
console.log('%cby InterSpaceStudios', 'font-size: 14px; color: #7c3aed;');
console.log('%cThanks for checking out our client! Have fun playing!', 'font-size: 12px; color: #a0a0b0;');
