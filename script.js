function login(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        alert('Username and password are required');
        return;
    }
    
    // Hash password before sending
    const hashedPassword = SHA256(password);
    
    // Send credentials over HTTPS
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
            username: username,
            password: hashedPassword
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Login failed');
        return response.json();
    })
    .then(data => {
        // Store secure session token
        sessionStorage.setItem('authToken', data.token);
        window.location.href = '/dashboard';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Invalid credentials');
    });
}