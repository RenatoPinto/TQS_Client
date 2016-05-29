define(['plugins/router', 'knockout', 'amplify'], function (router, ko, amplify) {
    var thatUser = this;

    return {
        displayName: 'Credenciação',
        description: 'Os visitantes e utilizadores podem navegar livremente na área pública do portal sem fornecer quaisquer informações pessoais, as quais apenas são necessárias para a inscrição na newsletter e para a prestação de informações e serviços sobre os imóveis. Numa política de melhoria contínua, recolhemos e analisamos a informação de navegação obtida através do Google Analytics sobre o endereço de IP, o fornecedor de serviços (ISP), o sistema operativo e o navegador utilizados, a resolução do écran do dispositivo, o tempo de visita e as páginas visualizadas.',
        theUsers: ko.observableArray([]),
        email: '',
        passwd: '',
        userIndex: -1,
        errorMessage: ko.observable(''),
        loggedUser: ko.observable(''),
        activate: function () {
            this.loggedUser('');
        },
        compositionComplete: function () {
            setTopInfo();
            var theUser = amplify.store.sessionStorage("loggedUser");
            if (theUser != undefined) {
                this.loggedUser(theUser);
            }
            if (this.theUsers().length > 0)
                return;
            thatUser = this;
            //getUsers();
        },
    }
});