document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in effect
    const fadeElems = document.querySelectorAll('.section');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElems.forEach(elem => {
        appearOnScroll.observe(elem);
    });

    // Typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero p');
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 40);
        }
    }

    typeWriter();

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: '3180db0f-5107-4472-86d3-e60e7e813e65',
                    name: name,
                    email: email,
                    message: message,
                    subject: 'New contact form submission',
                    to: 'tahir612011@gmail.com'
                })
            });

            const result = await response.json();
            if (result.success) {
                alert('Your message has been sent successfully!');
                contactForm.reset();
            } else {
                alert('There was an error sending your message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again.');
        }
    });
});