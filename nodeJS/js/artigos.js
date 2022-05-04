    window.onload = async function() {
        let artigostot = document.getElementById("noticias");
        let html;
        let artigo;
        console.log("[Artigos]" + JSON.stringify(artigostot));
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
            console.log(artigo.length);
            document.getElementById("artigos_title").innerHTML = artigo[i].artigos_title;
            document.getElementById("artigos_subtitle").innerHTML = artigo[i].artigos_subtitle;
            }
            for (i = 0; i < artigo.length;i++) {
                html += '<div class="u-align-center u-blog-post u-container-style u-repeater-item"><div class="u-container-layout u-similar-container u-container-layout-1"><h2 class="u-blog-control u-custom-item u-text u-text-1"><a class="u-post-header-link" href="noticiasBody.html">'+ artigo.artigos_title+'</a></h2><div class="u-blog-control u-post-content u-text u-text-2">'+ artigo.artigos_subtitle+ '</div><a class="u-post-header-link" href="blog/post-5.html"><img src="images/caisTejo-7.webp" alt=""class="u-blog-control u-expanded-width u-image u-image-default u-image-1" data-image-width="800"data-image-height="533"></a></div></div>';
            }
            console.log(html);
            artigostot.innerHTML+= html;
    }


    /* <h2 class="u-blog-control u-custom-item u-text u-text-1">
    <a class="u-post-header-link" href="noticiasBody.html"><span id ="artigos_title"></span></a>
    </h2>
    <div class="u-blog-control u-post-content u-text u-text-2"><span id ="artigos_subtitle"></span></div>*/
    //html += '<h2 class ="u-blog-control u-custom-item u-text u-text-1"><a class="u-post-header-link" href="noticiasBody.html"> ' + artigo.artigos_title + '</a></h2><div class="u-blog-control u-post-content u-text u-text-2">'+ artigo.artigos_subtitle+ '</div>';

  