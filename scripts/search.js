// Store page mappings for search
const pageIndex = {
    'index.html': 'About EarthWorks',
    'pages/team.html': 'Our Team',
    'pages/faqs.html': 'FAQs',
    'pages/code.html': 'Code and Data',
    'pages/papers.html': 'Papers & Presentations',
    'pages/related.html': 'Related Efforts',
    'pages/education.html': 'Education'
};

async function searchSite() {
    const searchTerm = document.getElementById('siteSearch').value.toLowerCase();
    const results = [];

    // Search through each page
    for (const [path, title] of Object.entries(pageIndex)) {
        try {
            const response = await fetch(path);
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const content = doc.body.textContent.toLowerCase();
            
            if (content.includes(searchTerm)) {
                results.push({ path, title });
            }
        } catch (error) {
            console.error(`Error searching ${path}:`, error);
        }
    }

    displayResults(results, searchTerm);
}

function displayResults(results, searchTerm) {
    let resultsHtml = `<h3>Search Results for "${searchTerm}"</h3>`;
    
    if (results.length === 0) {
        resultsHtml += '<p>No results found.</p>';
    } else {
        resultsHtml += '<ul>';
        results.forEach(({ path, title }) => {
            resultsHtml += `<li><a href="${path}">${title}</a></li>`;
        });
        resultsHtml += '</ul>';
    }

    // Create or update results display
    let resultsDiv = document.getElementById('searchResults');
    if (!resultsDiv) {
        resultsDiv = document.createElement('div');
        resultsDiv.id = 'searchResults';
        resultsDiv.className = 'search-results';
        document.querySelector('.main-content').prepend(resultsDiv);
    }
    resultsDiv.innerHTML = resultsHtml;
}

// Add Enter key listener
document.getElementById('siteSearch').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchSite();
    }
});
