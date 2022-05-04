window.onload = async function() {
    let artsElem = document.getElementById("artsElem");
    try {
        let artigos = await $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/embarcacao",
            method: "get",
            dataType: "json"
        });
        let html = "";
        console.log("[artsElem] artigos = " + JSON.stringify(artigos));
        artsElem.innerHTML = html;
    } catch (err) {
        console.log(err);
        artsElem.innerHTML = "<h1>Not available at this moment</h1>";
    }
}

function showEmbarcacao(id) {
    console.log("setItem->embarcacao_id = " + id);
    sessionStorage.setItem("embarcacao_id", id);
    window.location = "noticiasBody.html";
}