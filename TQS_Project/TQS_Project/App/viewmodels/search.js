define(['plugins/router', 'amplify'], function (router, amplify) {
    var that;
    function showData(data) {
        that.houses(JSON.parse(data));
    }

    return {
        displayName: 'Pesquisa',
        description: 'A imoQQCoisa é uma empresa de mediação imobiliária registada no Ministério das Finanças com o n.º 12.345 de acordo como Decreto-Lei n.º 32.134 de 23 de Junho de 1990.',
        houses: ko.observableArray(),
        activate: function () {
        },
        compositionComplete: function () {
            that = this;
            var searchText = location.hash.split("/").pop();
            var myUrl = "./Houses_GetHouses.txt"; 
            $.ajax({
                type: "GET",
                url: myUrl,
                data: { 'txt': searchText },
                //dataType: 'jsonp',
                //accepts: 'application/json',
                success: showData,
                error: function (xhr, status, err) {
                    alert('JSON load fail');
                }
            })
            setTopInfo();
        },
        showHouse: function (tmp) {
            router.navigate("#showHouse/" + tmp.ID)
        }
    }
});