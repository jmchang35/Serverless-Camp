const bunnForm = document.getElementById('bunnForm');

bunnForm.addEventListener('submit', function (event) {
    const username = document.getElementById("username").value
    const output = document.getElementById("output")
    output.textContent = username + "❤"
});