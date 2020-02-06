/* NECESARIO PARA EL PROYECTO - INICIO */
import './login.scss';
import './js/main';
import user from './js/clases/user';
/* NECESARIO PARA EL PROYECTO - FIN */
var btnIngresar = document.querySelector("#boton-ingresar");
var inputUser = document.querySelector("#id_username");
var inputPass = document.querySelector("#id_password");

btnIngresar.addEventListener('click', (evt) => {
    alert("gooo!");
    var username = inputUser.value;
    var pass = inputPass.value;
    
    var user1 = new user(username, pass);
    
    user1.validar(
        (usuario) => {
            usuario.login(
                (respuesta) => {
                    alert(respuesta.mensaje);
                },
                (error) => {
                    alert(error.error);
                });
        },
        (mensaje) => {
            alert(mensaje);
        }
    );
});
