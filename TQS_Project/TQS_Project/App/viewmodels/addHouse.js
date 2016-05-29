define(['plugins/http', 'plugins/router', 'knockout', 'magnificpopup'], function (http, router, ko, magnificpopup) {
    var that;

    return {
        displayName: 'Adição de novo imóvel',
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
            $('#resetButton').click(function () {
                location.reload();
            });
            $('#saveButton').click(function () {
                // Reposição dos <br/> antes de fazer o update!
                var tmp = $("#txt_Descricao").val();
                tmp = tmp.replace(/\\n/gi, "<br/>")
                // TODO : fazer o POST das variáveis

                // Continuar ...
                router.navigate('#welcome');
            });
        },
        convertTxt: function () {
            return this.Descricao().replace(/\<br\>/gi, "\n")
        }
    }
});