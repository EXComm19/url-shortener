window.onload = function () {
    urlInput = document.getElementById('longURLinput')
    urlInput.addEventListener('submit', (e) => {
        e.preventDefault()
        data = new FormData(urlInput)
        for (value of data.entries()) {
            const data = { 'longURL': value[1] }
            const option = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }
            console.log(data);
            fetch('/api/shorten', option).then((res) => {
                res.json().then((data) => {
                    document.getElementById('shortURL').textContent = data.shortURL
                    console.log(data.shortURL);
                    
                })

            })
        }
    })
}