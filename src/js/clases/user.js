import model from './model';

export default class user extends model{
    constructor(user,pass){
        var url = '/user';
        super(url);
        this.user=user;
        this.pass=pass;         
    }

    login(exito, error){
        var url = 'http://localhost:80/auth/login.php';

        var params = {
            method: 'POST',
            body: JSON.stringify({user: this.user, pass: this.pass}),
            headers: {
                'Content-Type': 'application/json'
            }
        };

       fetch(url, params).then(function(response) {
            if (response.ok) {
                return response;
            }
            throw Error(response.statusText);
        }).then(function(response) {
            return response.json();
        }).then(function(resjson) {
            if(resjson['error'] !== undefined){
                error(resjson);
            }else if(resjson['token'] !== undefined){
                exito(resjson);
            }
        }).catch((httpError) => {
            error({
                error: 'ERROR DE CONEXION: ' + httpError.message,
                codigo: '001'
            });
        });
        
    }

    validar(exito, error) {
        if(this.user==undefined || this.user.trim() == ''){
            error('Usuario no válido');
        }else if(this.pass==undefined || this.pass.trim() == ''){
            error('Contraseña no válida');
        }else{
            exito(this);
        }
    }
}