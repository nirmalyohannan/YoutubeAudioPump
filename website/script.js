document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        // Add active class to the clicked button
        button.classList.add('active');

        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Show the relevant tab content
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

document.getElementById('submit-single-url').addEventListener('click', function() {
    const url = document.getElementById('single-url-input').value;
    console.log(url);
    fetch('http://localhost:3000/submit-urls', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ urls: [url] })
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('api-response').innerText = data;
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('submit-multi-url').addEventListener('click', function() {
    const urls = document.getElementById('multi-urls').value.split(',').map(url => url.trim());
    fetch('http://localhost:3000/local/submit-urls', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ urls: urls })
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('api-response').innerText = data;
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('submit-playlist').addEventListener('click', function() {
    const playlistUrl = document.getElementById('youtube-playlist-input').value;
    fetch('http://localhost:3000/l/submit-playlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ playlistUrl: playlistUrl })
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('api-response').innerText = data;
    })
    .catch(error => console.error('Error:', error));
});