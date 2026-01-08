// ===== OS Tabs Functionality =====
const osTabs = document.querySelectorAll('.os-tab');
const osContents = document.querySelectorAll('.os-content');

osTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const os = tab.getAttribute('data-os');

        // Remove active from all tabs and contents
        osTabs.forEach(t => t.classList.remove('active'));
        osContents.forEach(c => c.classList.remove('active'));

        // Add active to clicked tab and corresponding content
        tab.classList.add('active');
        document.getElementById(os).classList.add('active');
    });
});

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Check if this item is already active
        const isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach(i => i.classList.remove('active'));

        // If it wasn't active, open it
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== Animate Steps on Scroll =====
const stepCards = document.querySelectorAll('.step-card');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Set initial state and observe
stepCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-20px)';
    card.style.transition = 'all 0.5s ease';
    stepObserver.observe(card);
});

// ===== Copy Code Blocks =====
document.querySelectorAll('.os-content code').forEach(codeBlock => {
    codeBlock.style.cursor = 'pointer';
    codeBlock.title = 'Click to copy';

    codeBlock.addEventListener('click', () => {
        const text = codeBlock.textContent;
        navigator.clipboard.writeText(text).then(() => {
            // Show feedback
            const originalText = codeBlock.textContent;
            codeBlock.textContent = 'Copied!';
            codeBlock.style.background = 'rgba(0, 255, 136, 0.3)';

            setTimeout(() => {
                codeBlock.textContent = originalText;
                codeBlock.style.background = '';
            }, 1500);
        });
    });
});

// ===== Auto-detect OS and highlight tab =====
function detectOS() {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes('win')) {
        return 'windows';
    } else if (userAgent.includes('mac')) {
        return 'mac';
    } else if (userAgent.includes('linux')) {
        return 'linux';
    }
    return 'windows'; // default
}

// Auto-select the user's OS tab on page load
document.addEventListener('DOMContentLoaded', () => {
    const detectedOS = detectOS();
    const osTab = document.querySelector(`.os-tab[data-os="${detectedOS}"]`);

    if (osTab) {
        // Remove active from all
        osTabs.forEach(t => t.classList.remove('active'));
        osContents.forEach(c => c.classList.remove('active'));

        // Activate detected OS
        osTab.classList.add('active');
        document.getElementById(detectedOS).classList.add('active');
    }
});

// ===== Keyboard Navigation for FAQ =====
faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextItem = faqItems[index + 1];
            if (nextItem) {
                nextItem.querySelector('.faq-question').focus();
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevItem = faqItems[index - 1];
            if (prevItem) {
                prevItem.querySelector('.faq-question').focus();
            }
        }
    });
});

// ===== Error Modal for Unavailable Links =====
const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');
const errorModalClose = document.getElementById('errorModalClose');
const errorModalOk = document.getElementById('errorModalOk');

function showErrorModal(message) {
    if (errorModal && errorMessage) {
        errorMessage.textContent = message;
        errorModal.classList.add('active');
    }
}

function closeErrorModal() {
    if (errorModal) {
        errorModal.classList.remove('active');
    }
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
