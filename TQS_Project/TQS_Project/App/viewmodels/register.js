define(['plugins/router', 'datepicker', 'amplify'], function (router, datepicker, amplify) {
    var that;
    return {
        displayName: 'Registar - Novo cliente',
        theUserData: {
            funcao: 'Admin',
            firstName: 'Jeremias',
            lastName: 'Zebedeu',
            email: 'zebedeu@rentacar.com',
            passwd: 'naosei.01',
            checkPasswd: '',
            morada: "Rua de cima\n3810-193",
            telefone: '919993476',
            dataNascimento: '1980-10-23',
            sexo: 'M',
            NIF: '123456789'
        },
        activate: function(id, querystring){
        },
        compositionComplete: function () {
            setTopInfo();
            $('#InputDataNascimento').datepicker({
                format : 'yyyy-mm-dd',
                startView: 'decade',
                endDate: '-18y',
                language: 'pt',
                todayHighlight : true,
            });
            $('#InputPassword1').change(function () {
                if ($(this).val().length >= 7) 
                    $('#InputPassword1Err')
                        .html('<i class="fa fa-check-circle-o fa-2x small" title="Password válida."></i>')
                        .addClass('text-success').removeClass('text-danger');
                else 
                    $('#InputPassword1Err')
                        .html('<i class="fa fa-check-circle-o fa-2x small" title="Password sem tamanho mínimo (7 chars)."></i>')
                        .addClass('text-danger').removeClass('text-success');
            });
            $('#InputPassword2').change(function () {
                if ($('#InputPassword1').val() == $('#InputPassword2').val() && $(this).val().length >= 7 ) 
                    $('#InputPassword2Err')
                        .html('<i class="fa fa-check-circle-o fa-2x small" title="Validação correta."></i>')
                        .addClass('text-success').removeClass('text-danger');
                else 
                    $('#InputPassword2Err')
                        .html('<i class="fa fa-times-circle-o fa-2x small" title="Repetição diferente da palavra-passe inicial."></i>')
                        .addClass('text-danger').removeClass('text-success');;
            });
        },
        submitForm: function () {
            //--- (TODO) Submeter os dados para o servidor
            alert("INFO TO POST:\n" + JSON.stringify(this.theUserData));
            //--- (TODO) se falhar a criação do utilizador ...
            //--- return;
            //--- Se houver sucesso (conta nova)
            this.theUserData.userID = 1;
            this.theUserData.loggedIn = true;
            //--- (TODO)  versão de debug
            amplify.store('theUserData', this.theUserData);
            //--- (TODO)  versão de final (os dados desaparecem no fim da sessão)
            //--- amplify.store.sessionStorage('theUserData', this.theUserData);
            router.navigate("");
        },
    }
});