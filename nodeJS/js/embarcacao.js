window.onload = async function() {
    try {

        let embarc = await $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/embarcacao/2" /*+embarcacao_id */,
            method: "get",
            dataType: "json"
        });
        console.log("[embarcacaoes] embarcacao = " + JSON.stringify(embarc));
        document.getElementById("embarcacao_name").innerHTML = embarc.embarcacao_name;
        document.getElementById("embarcacao_info").innerHTML = embarc.embarcacao_info;
        document.getElementById("embarcacao_prop_id").innerHTML = embarc.embarcacao_prop_id;
        document.getElementById("embarcacao_cais_id").innerHTML = embarc.embarcacao_cais_id;
    } catch (err) {
        console.log(err);
        let mainElem = document.getElementById("main");
        if (err.status == 404)
            mainElem.innerHTML =
            "<h1>" + err.responseJSON.msg + "</h1>" + "<h2>Please select an existing embarc</h2>";
        else mainElem.innerHTML =
            "<h1>Server problems, please try later</h1>";
    }
} 