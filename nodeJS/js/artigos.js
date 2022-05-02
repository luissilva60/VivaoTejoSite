    window.onload = async function() {
        artigos_id = sessionStorage.getItem("artigos_id");
        console.log("setItem->cona = " + artigos_id);
        try {
    
            let artigo = await $.ajax({
                url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/artigos/1" /*+artigos_id */,
                method: "get",
                dataType: "json"
            });
            console.log("[artigos] artigo = " + JSON.stringify(artigo));
            document.getElementById("artigos_title").innerHTML = artigo.artigos_title;
            document.getElementById("artigos_subtitle").innerHTML = artigo.artigos_subtitle;
            document.getElementById("artigos_info").innerHTML = artigo.artigos_info;
            document.getElementById("artigos_date").innerHTML = artigo.artigos_date;
            document.getElementById("artigos_ut_id").innerHTML = artigo.artigos_ut_id;
        } catch (err) {
            console.log(err);
            let mainElem = document.getElementById("main");
            if (err.status == 404)
                mainElem.innerHTML =
                "<h1>" + err.responseJSON.msg + "</h1>" + "<h2>Please select an existing artigo</h2>";
            else mainElem.innerHTML =
                "<h1>Server problems, please try later</h1>";
        }
    } 