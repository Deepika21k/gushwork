document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header Logic
    const header = document.getElementById('main-header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
        }
        lastScrollY = window.scrollY;
    });

    // 2. Image Carousel Logic
    const mainImg = document.getElementById('main-product-img');
    const thumbnails = document.querySelectorAll('.thumbnails img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentIndex = 0;
    const images = Array.from(thumbnails).map(img => img.src.replace('150', '800'));

    function updateGallery(index) {
        currentIndex = index;
        mainImg.src = images[currentIndex];
        
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
    }

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => updateGallery(index));
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateGallery(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateGallery(currentIndex);
    });

    // 3. Zoom Functionality
    const zoomContainer = document.getElementById('zoom-container');

    zoomContainer.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = zoomContainer.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        mainImg.style.transformOrigin = `${x}% ${y}%`;
    });

    zoomContainer.addEventListener('mouseenter', () => {
        mainImg.style.transform = 'scale(2)';
    });

    zoomContainer.addEventListener('mouseleave', () => {
        mainImg.style.transform = 'scale(1)';
        mainImg.style.transformOrigin = 'center center';
    });
});



document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const icon = question.querySelector('i');
        const isActive = item.classList.contains('active');

        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('i').classList.replace('fa-chevron-up', 'fa-chevron-down');
        });

        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            item.classList.remove('active');
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });
});


// Applications Slider Logic
const slider = document.getElementById('apps-slider');
const prevBtn = document.querySelector('.prev-slide');
const nextBtn = document.querySelector('.next-slide');

if (slider && prevBtn && nextBtn) {
    const scrollAmount = 400; // Adjust based on card width + gap

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
}


const processData = {
    'raw-material': {
        title: 'High-Grade Raw Material Selection',
        description: 'Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.',
        features: ['PE100 grade material', 'Optimal molecular weight distribution'],
        img: 'images/about_us.webp'
    },
    'extrusion': {
        title: 'Precision Extrusion Process',
        description: 'Advanced extrusion lines melt and shape the HDPE material through high-precision dies to ensure consistent wall thickness.',
        features: ['Computerized temperature control', 'High-torque screw technology'],
        img: 'images/about_us.webp'
    },
    'cooling': {
        title: 'Controlled Vacuum Cooling',
        description: 'Intensive cooling in vacuum tanks stabilizes the pipe dimensions and ensures structural integrity before final sizing.',
        features: ['Multi-stage water cooling', 'Precise vacuum pressure'],
        img: 'images/about_us.webp'
    }
// Add other steps as needed...
};

document.querySelectorAll('.process-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const step = tab.getAttribute('data-step');
        const data = processData[step];

        if (!data) return;

        // Update active class
        document.querySelectorAll('.process-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update content with transition
        const display = document.getElementById('process-display');
        display.style.opacity = '0';

        setTimeout(() => {
            document.getElementById('process-title').innerText = data.title;
            document.getElementById('process-description').innerText = data.description;
            document.getElementById('process-img').src = data.img;

            const checklist = document.getElementById('process-checklist');
            checklist.innerHTML = data.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('');

            display.style.opacity = '1';
        }, 300);
    });
});


// Optional: Auto-scroll or drag functionality for testimonials
const testimonialContainer = document.querySelector('.testimonial-cards-container');

if (testimonialContainer) {
    let isDown = false;
    let startX;
    let scrollLeft;

    testimonialContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        testimonialContainer.classList.add('active');
        startX = e.pageX - testimonialContainer.offsetLeft;
        scrollLeft = testimonialContainer.scrollLeft;
    });

    testimonialContainer.addEventListener('mouseleave', () => {
        isDown = false;
    });

    testimonialContainer.addEventListener('mouseup', () => {
        isDown = false;
    });

    testimonialContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - testimonialContainer.offsetLeft;
        const walk = (x - startX) * 2; 
        testimonialContainer.scrollLeft = scrollLeft - walk;
    });
}


// Simple click handling for portfolio interactions
document.querySelectorAll('.btn-learn-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const product = e.target.closest('.portfolio-card').querySelector('h3').innerText;
        console.log(`Requesting more info for: ${product}`);
    });
});

document.querySelector('.btn-expert-call').addEventListener('click', () => {
    // Replace with actual contact logic or modal
    window.location.href = "tel:+1234567890";
});


document.getElementById('quote-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic animation for feedback
    const btn = this.querySelector('.btn-submit');
    const originalText = btn.innerText;
    
    btn.innerText = 'Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you! Your request for a custom quote has been sent.');
        btn.innerText = originalText;
        btn.disabled = false;
        this.reset();
    }, 1500);
});


// Add current year dynamically if needed
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const copyrightText = document.querySelector('.footer-bottom p');
    if (copyrightText) {
        copyrightText.innerHTML = copyrightText.innerHTML.replace('2025', currentYear);
    }
});
