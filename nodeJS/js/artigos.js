$(document).ready(function() {

    function getArtigos() {
        
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/artigos",
        type: "GET",
        dataType: 'json',
        success: function(result) {
            console.log(result);
        }
    });

    }
    getArtigos();

    $('#btnSubmit').on('click', function(event) {
        
        // prevent form default behaviour
        event.preventDefault();

        // disabled the submit button
        $("#btnSubmit").prop("disabled", true);

        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/artigos",
            type: "POST",
            data: {
                email: jQuery('[name=uemail]').val(),
                password: jQuery('[name=upsw]').val()
            },
            dataType: 'json',
            success: function(result) {
                console.log("SUCCESS : ", result);
                $("#output").text(JSON.stringify(result.user[0]));
                $("#btnSubmit").prop("disabled", false);
            }
        });

    });

}); 