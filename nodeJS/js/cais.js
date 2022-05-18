window.onload = async function() {
    let cais;
    let html;
    try {
        cais = await $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/cais",
            method: "get",
            dataType: "json"
        });
        
    } catch (err) {
        console.log(err);
        let mainElem = document.getElementById("main");
        if (err.status == 404)
            mainElem.innerHTML = 
            "<h1>" + err.responseJSON.msg + "</h1>" + "<h2>Please select an existing artigo</h2>";
        else mainElem.innerHTML =
            "<h1>Server problems, please try later</h1>";
    }
    console.log("[cais] cais = " + JSON.stringify(cais));
}

/*function createCaisHTML(cais) {
    return "(cais id)= " + cais.cais_id + ";" +
        "(cais nome)= " + cais.cais_name + ";" +
        "(cais spot)= " + cais.cais_spot;
}

function showCais(id) {
    console.log("setItem->caisId = " + id);
    sessionStorage.setItem("caisId", id);
    window.location = "mapateste.html";
}*/