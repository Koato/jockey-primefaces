export class Token {
    // nombre del token
    nombre_jwt_localStorage = "user_jck_token";
    // nombre del tipo de token
    type_jwt_localStorage = "type_jck_token";
    // nombre del usuario logueado
    nombre_user_localStorage = "user_jck_name";
    
    almacenar_localStorage(data) {
        localStorage.setItem(this.nombre_jwt_localStorage, data.token);
        localStorage.setItem(this.type_jwt_localStorage, data.tokenType);
        localStorage.setItem(this.nombre_user_localStorage, data.usuario.username);
    }
    
    getToken() {
        return localStorage.getItem(this.nombre_jwt_localStorage);
    }
    
    getTokenType() {
        return localStorage.getItem(this.type_jwt_localStorage);
    }
    
    getUserName() {
        return localStorage.getItem(this.nombre_user_localStorage);
    }

    borrar_localStorage() {
        localStorage.removeItem(this.nombre_jwt_localStorage);
        localStorage.removeItem(this.type_jwt_localStorage);
        localStorage.removeItem(this.nombre_user_localStorage);
    }
}