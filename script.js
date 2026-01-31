// Wait for DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initFilters();
    initClipboard();
    initStickyNav();
});

// ============================================
// 1. TYPEWRITER EFFECT
// ============================================
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

function initTypewriter() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}


// ============================================
// 2. PROJECT FILTER
// ============================================
function initFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            buttons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projects.forEach(project => {
                const category = project.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    project.classList.remove('hidden');
                    // Add fade in animation logic if desired via CSS
                } else {
                    project.classList.add('hidden');
                }
            });
        });
    });
}


// ============================================
// 3. COPY TO CLIPBOARD
// ============================================
function initClipboard() {
    const copyBtn = document.getElementById('copy-btn');
    const emailText = document.getElementById('email-text').innerText;
    const feedback = document.getElementById('copy-feedback');

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(emailText).then(() => {
            // Show feedback
            feedback.classList.add('visible');
            
            // Hide feedback after 2 seconds
            setTimeout(() => {
                feedback.classList.remove('visible');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
}

function copyToClipboard(elementId, feedbackId) {
    const text = document.getElementById(elementId).innerText;
    const feedback = document.getElementById(feedbackId);

    navigator.clipboard.writeText(text).then(() => {
        feedback.classList.add('visible');
        setTimeout(() => {
            feedback.classList.remove('visible');
        }, 2000);
    });
}


// ============================================
// 4. SMOOTH SCROLL OFFSET (Sticky Nav Fix)
// ============================================
function initStickyNav() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}