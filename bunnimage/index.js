const bunnForm = document.getElementById('bunnForm');

bunnForm.addEventListener('submit', async function (event) {
    event.preventDefault()
    const username = document.getElementById("username").value
    const output = document.getElementById("output")
    if (!username) {
        alert("No name error.")
        return;
    }
    let fileInput = document.getElementById("image");
    const file = fileInput.files[0];
    
    var payload = new FormData(bunnForm);
    payload.append("file", file)
    const endpoint = "https://bitproj1.azurewebsites.net/api/bunnimage-upload?code=lROdwd__ls-Khmn2ivXtFfoFEyZ8xL-V0WTvFX6kyO8jAzFufx5t9g=="
    const options = {
        "method": "POST",
        "body": payload,
        headers: {
            "codename": username,
            "Content-Type": "multipart/form-data"
        }
    }
    const resp = await fetch(endpoint, options);
    const data = await resp.text();
    output.testContent = "Your image has been stored successfully!"
   

});