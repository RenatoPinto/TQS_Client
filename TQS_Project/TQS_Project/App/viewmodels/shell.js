define(['plugins/router', 'durandal/app'], function (router, app) {
    setTopInfo = function () {
        //--- Verifica se existe uma variável de sessão contendo o perfil do utilizador loggado ...
        var theUser = amplify.store.sessionStorage("loggedUser");
        //--- ... se existir ...
        if (theUser != undefined) {
            //--- ... e a área de informação do utilizador"ainda" não estiver disponível ...
            if ($("#userArea").hasClass('hidden')) {
                //--- ... apresenta a informação pública do utilizador e ...
                $("#userArea").removeClass('hidden');
                $('#userName').html(theUser.firstName + ' ' + theUser.lastName);
                $('#userRole').html(theUser.funcao);
                $('#userEmail').html(theUser.email);
            }
            //--- ... liga o menu das estatísticas.
            $("a[href^='#stats']").removeClass('hidden');
        }
            //--- ... não se existir ...
        else {
            //--- desliga o menu das estatísticas e...
            $("a[href^='#stats']").addClass('hidden');
            //--- esconde a área de informação do utilizador
            if (!$("#userArea").hasClass('hidden'))
                $("#userArea").addClass('hidden');
        }
    }

    return {
        router: router,
        searchText: ko.observable(),
        search: function () {
            var that = this;
            that.searchText($('#searchText').val());
            if ($('#searchText').val().length > 0)
                router.navigate('#search/' + $('#searchText').val());
            else
                app.showMessage('Erro: Tem de inserir um texto de pesquisa.');
        },
        activate: function () {
            router.map([
                { route: '', title: 'Welcome', moduleId: 'viewmodels/welcome', nav: false },
                { route: 'login', title: 'Credenciação', moduleId: 'viewmodels/login', nav: false },
                { route: 'register', moduleId: 'viewmodels/register', nav: false },
                { route: 'search/:txt', moduleId: 'viewmodels/search', nav: false },
                { route: 'showHouse/:id', moduleId: 'viewmodels/showHouse', nav: false },
                { route: 'editHouse/:id', moduleId: 'viewmodels/editHouse', nav: false },
                { route: 'addHouse', moduleId: 'viewmodels/addHouse', nav: false },
            ]).buildNavigationModel();

            return router.activate();
        },
        compositionComplete: function () {
        }
    };
});