define(['plugins/http', 'plugins/router', 'knockout', 'magnificpopup'], function (http, router, ko, magnificpopup) {
    var that;
    var map;
    function showData(data) {
        var theData = JSON.parse(data);
        that.ID(theData.ID);
        that.Descricao(theData.Descricao);
        that.Estado(theData.Estado);
        that.TipoDeImovel(theData.TipoDeImovel);
        that.Condicao(theData.Condicao);
        that.Tipologia(theData.Tipologia);
        that.Preco(theData.Preco + ' €');
        that.Area(theData.Area + ' m<sup>2</sup>');
        that.Distrito(theData.Distrito);
        that.Concelho(theData.Concelho);
        that.Freguesia(theData.Freguesia);
        that.GPS(theData.GPS);
        that.Fotos(theData.Fotos);
        initMap();
    }
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: that.GPS()[0], lng: that.GPS()[1] },
            zoom: 15,
        });
        var marker = new google.maps.Marker(
            {
                map: map,
                position: { lat: that.GPS()[0], lng: that.GPS()[1] },
                title: that.Freguesia()
            }
        );
    }
    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    };
    function isValidPhoneNumber(txtPhone) {
        var pattern = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
        return (pattern.test(txtPhone));
    }

    return {
        displayName: 'Visualização de imóvel',
        description: 'A informação disponibilizada para todos os imóveis é meramente ficcionada e qualquer semelhança com a realidade é pura coincidência (ou não ☹).',
        ID: ko.observable(),
        Descricao: ko.observable(),
        Estado: ko.observable(),
        TipoDeImovel: ko.observable(),
        Condicao: ko.observable(),
        Tipologia: ko.observable(),
        Preco: ko.observable(),
        Area: ko.observable(),
        Distrito: ko.observableArray(),
        Concelho: ko.observableArray(),
        Freguesia: ko.observableArray(),
        GPS: ko.observableArray(),
        Fotos: ko.observableArray(),
        SuccessMessage : ko.observable(),
        activate: function () {
        },
        compositionComplete: function () {
            that = this;
            var id = location.hash.split("/").pop();
            var myUrl = "./Houses_Detail_" + id + ".txt"
            $.ajax({
                type: "GET",
                url: myUrl,
                //dataType: 'jsonp',
                //accepts: 'application/json',
                success: showData,
                error: function (xhr, status, err) {
                    alert('JSON load fail');
                }
            });

            $('#PersonDataSend').click(function (event) {
                var retVal = true;
                if ($.trim($('#PersonData_Name').val()).length < 10) {
                    if ($('#PersonData_Name_Error').hasClass("no_error"))
                        $('#PersonData_Name_Error').removeClass("no_error").addClass("error");
                    retVal = false;
                }
                else {
                    if ($('#PersonData_Name_Error').hasClass("error"))
                        $('#PersonData_Name_Error').removeClass("error").addClass("no_error");
                }
                if (!isValidEmailAddress($('#PersonData_Email').val())) {
                    if ($('#PersonData_Email_Error').hasClass("no_error"))
                        $('#PersonData_Email_Error').removeClass("no_error").addClass("error");
                    retVal = false;
                }
                else {
                    if ($('#PersonData_Email_Error').hasClass("error"))
                        $('#PersonData_Email_Error').removeClass("error").addClass("no_error");
                }
                if (!isValidPhoneNumber($('#PersonData_Telefone').val())) {
                    if ($('#PersonData_Telefone_Error').hasClass("no_error"))
                        $('#PersonData_Telefone_Error').removeClass("no_error").addClass("error");
                    retVal = false;
                }
                else {
                    if ($('#PersonData_Telefone_Error').hasClass("error"))
                        $('#PersonData_Telefone_Error').removeClass("error").addClass("no_error");
                }
                if (retVal) {
                    //ajax 
                    $.ajax({
                        type: "POST",
                        url: 'demo_test_post.aspx',
                        //dataType: 'jsonp',
                        //accepts: 'application/json',
                    data: {
                        "Nome": $("#PersonData_Name").val(),
                        "Email": $('#PersonData_Email').val(),
                        "Telefone": $('#PersonData_Telefone').val(),
                        "Comentarios": $('#PersonData_Comentarios').val()
                    },
                    success: function (data, status) {
                        that.SuccessMessage(data);
                        $('#myModalPersonData').modal('toggle');
                        $('#myModalSuccess').modal('toggle');
                        //alert("Data: " + data + "\nStatus: " + status);
                        },
                        error: function (xhr, status, err) {
                            alert('JSON load fail. XHR: ' + xhr + "\nStatus: " + status + "\nErr: " + err);
                        }
                    });
                };
            });

            $('.popup-gallery').magnificPopup({
                type: 'image',
                delegate: 'a',
                tLoading: 'Loading image #%curr%...',
                closeOnContentClick: false,
                closeBtnInside: false,
                removalDelay: 300,
                mainClass: 'mfp-with-zoom mfp-img-mobile',
                image: {
                    verticalFit: true,
                    titleSrc: function (item) {
                        var d = new Date();
                        var n = d.getFullYear();
                        return '<small>&copy; ' + n + ' - imobQQCoisa</small>';
                    }
                },
                gallery: {
                    enabled: true
                },
                zoom: {
                    enabled: true,
                    duration: 300, // don't foget to change the duration also in CSS
                    opener: function (element) {
                        return element.find('img');
                    }
                }
            });

        },
        gotoEdit: function () {
            router.navigate('#editHouse/' + this.ID());
        },
        gotoAdd: function () {
            router.navigate('#addHouse');
        },
    }
});