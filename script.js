// Nabi777 Art Gallery Script

let editMode = false;

// Toggle edit mode
function toggleEditMode() {
    editMode = !editMode;
    document.body.classList.toggle('edit-mode', editMode);
    const editBtn = document.getElementById('edit-toggle');
    if (editBtn) {
        editBtn.textContent = editMode ? 'Exit Edit Mode' : 'Edit Mode';
    }

    // Make elements editable
    document.querySelectorAll('[data-editable]').forEach(el => {
        el.contentEditable = editMode;
        el.classList.toggle('editable', editMode);
    });

    // Show/hide image upload inputs
    document.querySelectorAll('.image-upload').forEach(input => {
        input.style.display = editMode ? 'block' : 'none';
    });

    if (editMode) {
        loadSavedData();
    } else {
        saveData();
    }
}

// Load saved data from localStorage
function loadSavedData() {
    document.querySelectorAll('[data-editable]').forEach(el => {
        const key = el.dataset.editable;
        const saved = localStorage.getItem(key);
        if (saved) {
            el.textContent = saved;
        }
    });

    // Load saved images
    document.querySelectorAll('.art-piece img').forEach((img, index) => {
        const savedSrc = localStorage.getItem(`art-image-${index}`);
        if (savedSrc) {
            img.src = savedSrc;
        }
    });
}

// Save data to localStorage
function saveData() {
    document.querySelectorAll('[data-editable]').forEach(el => {
        const key = el.dataset.editable;
        localStorage.setItem(key, el.textContent);
    });
}

// Handle image upload
function handleImageUpload(event, artIndex) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.querySelectorAll('.art-piece img')[artIndex];
            img.src = e.target.result;
            localStorage.setItem(`art-image-${artIndex}`, e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// Initialize edit mode toggle
document.addEventListener('DOMContentLoaded', function() {
    // Add edit toggle button to header
    const header = document.querySelector('header .logo');
    const editBtn = document.createElement('button');
    editBtn.id = 'edit-toggle';
    editBtn.textContent = 'Edit Mode';
    editBtn.style.cssText = `
        background: linear-gradient(45deg, #ff77c6, #78d6ff);
        color: #1a1a2e;
        border: none;
        padding: 8px 16px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: bold;
        margin-top: 10px;
        transition: all 0.3s ease;
    `;
    editBtn.addEventListener('click', toggleEditMode);
    header.appendChild(editBtn);

    // Add image upload inputs
    document.querySelectorAll('.art-piece').forEach((piece, index) => {
        const uploadInput = document.createElement('input');
        uploadInput.type = 'file';
        uploadInput.accept = 'image/*';
        uploadInput.className = 'image-upload';
        uploadInput.style.cssText = `
            display: none;
            margin: 10px auto;
            padding: 5px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.1);
            color: #e6e6e6;
        `;
        uploadInput.addEventListener('change', (e) => handleImageUpload(e, index));
        piece.appendChild(uploadInput);
    });

    // Load saved data on page load
    loadSavedData();
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetUrl = this.getAttribute('href');
        if (targetUrl.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetUrl);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        } else if (!targetUrl.includes('http')) {
            // Internal navigation
            e.preventDefault();
            window.location.href = targetUrl;
        }
    });
});

// Add hover effects for art pieces
document.querySelectorAll('.art-piece').forEach(piece => {
    piece.addEventListener('mouseenter', () => {
        if (!editMode) {
            piece.style.transform = 'translateY(-10px) scale(1.02)';
            piece.style.boxShadow = '0 20px 40px rgba(255, 119, 198, 0.3)';
        }
    });
    piece.addEventListener('mouseleave', () => {
        if (!editMode) {
            piece.style.transform = 'translateY(0) scale(1)';
            piece.style.boxShadow = 'none';
        }
    });
});

// Handle price input changes
document.querySelectorAll('.price-section input').forEach(input => {
    input.addEventListener('input', function() {
        localStorage.setItem(`price-${this.id}`, this.value);
    });

    // Load saved price
    const savedPrice = localStorage.getItem(`price-${input.id}`);
    if (savedPrice) {
        input.value = savedPrice;
    }
});

// Form submission handling
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We\'ll get back to you soon.');
        this.reset();
    });
});

// Add floating animation to shapes
document.querySelectorAll('.floating-shape').forEach((shape, index) => {
    shape.style.animation = `float 6s ease-in-out infinite ${index * 0.5}s`;
});

// Add glow effect to headings
document.querySelectorAll('h2').forEach(heading => {
    heading.addEventListener('mouseenter', () => {
        heading.style.textShadow = '0 0 20px rgba(255, 119, 198, 0.8)';
    });
    heading.addEventListener('mouseleave', () => {
        heading.style.textShadow = '';
    });
});

// Parallax effect for background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    document.body.style.backgroundPosition = `0 ${rate}px`;
});