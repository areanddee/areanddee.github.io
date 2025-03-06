document.getElementById('careers-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    
    try {
        const response = await fetch('/api/submit-application', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            alert('Thank you for your application! We will be in touch soon.');
            e.target.reset();
        } else {
            alert('Error submitting application: ' + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting application. Please try again later.');
    }
});

// Add touch event handling
document.addEventListener('DOMContentLoaded', function() {
    // Make buttons and links touch-friendly
    const touchElements = document.querySelectorAll('button, .nav-link, .focus-link');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        
        element.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
    
    // Handle file input for mobile
    const fileInput = document.getElementById('resume');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const fileName = e.target.files[0]?.name || 'No file chosen';
            // Optional: Display filename
            console.log('Selected file:', fileName);
        });
    }
}); 