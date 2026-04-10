document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // GLOBAL UI: NAVIGATION & HEADER
    // (on every page)
    // ==========================================
    const toggleButton = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.top-nav');
    const header = document.querySelector('.site-header');

    // Mobile Menu Toggle
    if (toggleButton && navMenu) {
        toggleButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            toggleButton.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Header Scroll Effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ==========================================
    // GLOBAL ANIMATIONS (GSAP)
    // (Runs where these classes exist)
    // ==========================================
    if (typeof gsap !== 'undefined') {
        gsap.from(".hero-content h1", { opacity: 0, y: 30, duration: 1.2, ease: "power4.out" });
        gsap.from(".hero-sub", { opacity: 0, y: 20, duration: 1, delay: 0.3 });
        gsap.from(".underline", { width: 0, duration: 1, delay: 0.5 });
        gsap.from(".hero-actions", { opacity: 0, duration: 1, delay: 0.8 });
    }

    // ==========================================
    // PAGE: ABOUT US (Video)
    // ==========================================
    const video = document.getElementById('missionVideo');
    if (video) {
        video.addEventListener('timeupdate', function() {
            // Pause 4.5 seconds before the actual end of the video
            if (this.duration && this.currentTime > (this.duration - 4.5)) {
                this.pause();
            }
        });
    }

    // ==========================================
    // Page: CONTACT US FORM
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const contactResult = document.getElementById('result');
    const contactSubmitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            contactSubmitBtn.textContent = 'Launching...';
            contactSubmitBtn.disabled = true;

            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let res = await response.json();
                if (response.status == 200) {
                    contactResult.style.color = "#00ff00";
                    contactResult.innerHTML = "Success! Message sent.";
                    contactForm.reset();
                } else {
                    contactResult.style.color = "#ff0000";
                    contactResult.innerHTML = res.message;
                }
            })
            .catch(error => {
                contactResult.innerHTML = "Something went wrong!";
            })
            .finally(function() {
                // Reset button after 5 seconds
                setTimeout(() => {
                    contactResult.innerHTML = "";
                    contactSubmitBtn.textContent = 'Send Message';
                    contactSubmitBtn.disabled = false;
                }, 5000);
            });
        });
    }

    // ==========================================
    // PAGE: MISSION ORDER FORM
    // ==========================================
    const orderForm = document.getElementById('order-form');
    const orderResult = document.getElementById('order-result');
    const orderSubmitBtn = document.getElementById('order-submit-btn');

    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            orderSubmitBtn.textContent = 'Transmitting...';
            orderSubmitBtn.disabled = true;

            const formData = new FormData(orderForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let res = await response.json();
                if (response.status == 200) {
                    // Redirects to Thank You page on success
                    window.location.href = "thankYou.html";
                } else {
                    orderResult.style.color = "#ff0000";
                    orderResult.innerHTML = res.message;
                }
            })
            .catch(error => {
                orderResult.style.color = "#ff0000";
                orderResult.innerHTML = "Signal Interrupted. Please check connection.";
            })
            .finally(function() {
                // Reset button after 5 seconds (if redirect fails)
                setTimeout(() => {
                    orderSubmitBtn.textContent = 'Authorize Mission';
                    orderSubmitBtn.disabled = false;
                }, 5000);
            });
        });
    }

});