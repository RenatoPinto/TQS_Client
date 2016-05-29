define(['plugins/http', 'plugins/router', 'knockout', 'magnificpopup'], function (http, router, ko, magnificpopup) {
    var that;
    function showData(data) {
        var theData = JSON.parse(data);
        that.ID(theData.ID);
        that.Descricao(theData.Descricao);
        that.Estado(theData.Estado);
        that.TipoDeImovel(theData.TipoDeImovel);
        that.Condicao(theData.Condicao);
        that.Tipologia(theData.Tipologia);
        that.Preco(theData.Preco);
        that.Area(theData.Area);
        that.Distrito(theData.Distrito);
        that.Concelho(theData.Concelho);
        that.Freguesia(theData.Freguesia);
        that.GPS(theData.GPS);
        that.Fotos(theData.Fotos);
    }    
    return {
        displayName: 'Edição de imóvel',
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
            $('#resetButton').click(function () {
                location.reload();
            });
            $('#saveButton').click(function () {
                // Reposição dos <br/> antes de fazer o update!
                var tmp = $("#txt_Descricao").val();
                tmp = tmp.replace(/\\n/gi, "<br/>")
                // TODO : fazer o POST das variáveis

                // Continuar ...
                router.navigate('#showHouse/'+that.ID());
            });
        },
        convertTxt: function () {
            var tmp = this.Descricao();
            if (tmp != undefined)
                return tmp.replace(/\<br\>/gi, "\n");
        }
    }
});