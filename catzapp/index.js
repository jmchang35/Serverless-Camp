const button = document.getElementById("button1");

button.addEventListener("click", async function() {

    const name1 = document.getElementById("name1").value;
    const name2 = document.getElementById("name2").value;
    const name3 = document.getElementById("name3").value;
    const name4 = document.getElementById("name4").value;

    const AZURE_URL = "https://bitproj1.azurewebsites.net/api/twocatz?code=SqI1Ja9KEXBgetNmz2E4gjXNm-N8ZW3LaRMwKX6zdA-zAzFuhIyUHA==";
    const fetch_url = `${AZURE_URL}&name1=${name1}&name2=${name2}&name3=${name3}&name4=${name4}`;

    const resp = await fetch(fetch_url, {
        method: "GET",
    });

    const data = await resp.json();
    
    setSourceOfBase64("image1", data.cat1);
    setSourceOfBase64("image2", data.cat2);
    setSourceOfBase64("image3", data.cat3);
    setSourceOfBase64("image4", data.cat4);
   
})


function setSourceOfBase64(id, base64String) {
    document.getElementById(id).src = "data:image/png;base64," + base64String;
}