function showOrg(orgId) {
    // Hide all sections
    document.querySelectorAll('.org-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(orgId).classList.add('active');
    
    // Update tab styling
    document.querySelectorAll('.org-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
}
