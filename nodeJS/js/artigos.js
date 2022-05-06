    window.onload = async function() {
        let artigostot = document.getElementById("noticias"); 
        let artigo;
        let html = "";
        try {
            artigo = await $.ajax({
                url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/artigos",
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
         for (i = 0; i < artigo.length ;i++) {
                console.log("[artigos] artigo = " + JSON.stringify(artigo));
                document.getElementById("artigos_title").innerHTML = artigo[i].artigos_title;
                document.getElementById("artigos_subtitle").innerHTML = artigo[i].artigos_subtitle;
            }
            for (i = 0; i < artigo.length;i++) {
                html += "<section><h1>" + artigo[i].artigos_title + "</h1>" + "<h2>" + artigo[i].artigos_subtitle + "</h2></section>";
            } 
            console.log("[Artigos]" + JSON.stringify(artigostot));
            artigostot.innerHTML+= html;
            console.log(html);
    }


    /* <h2 class="u-blog-control u-custom-item u-text u-text-1">
    <a class="u-post-header-link" href="noticiasBody.html"><span id ="artigos_title"></span></a>
    </h2>
    <div class="u-blog-control u-post-content u-text u-text-2"><span id ="artigos_subtitle"></span></div>*/
    //html += '<h2 class ="u-blog-control u-custom-item u-text u-text-1"><a class="u-post-header-link" href="noticiasBody.html"> ' + artigo.artigos_title + '</a></h2><div class="u-blog-control u-post-content u-text u-text-2">'+ artigo.artigos_subtitle+ '</div>';

  