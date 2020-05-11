import axios from 'axios';
import { LoginService } from './LoginService';

export class PersonaService {
    // baseUrl = 'http://localhost:7559';
    baseUrl = 'https://jockey-web.herokuapp.com';
    
    
    async listarTodo(){
        let tokenLogin = this.validarInfoToken();
        const response = await axios.get(this.baseUrl + '/usuarios', {
            headers : {
                'Authorization': tokenLogin
            }
        });
        return response.data;
    }
    
    async listarId(id){
        let tokenLogin = this.validarInfoToken();
        const response = await axios.get(this.baseUrl + '/usuarios/' + id, {
            headers : {
                'Authorization': tokenLogin
            }
        });
        return response.data;
    }

    async crearPersona(usuario){
        let tokenLogin = this.validarInfoToken();
        const response = await axios.post(this.baseUrl + '/usuarios', {
            "alias": usuario.alias,
            "clave": usuario.clave,
            "estado": usuario.estado,
            "tiempoAcceso": '10/05/2020',
            "roles": usuario.roles
        }, {
            headers : {
                'Authorization': tokenLogin
            }
        });
        return response.data;
    }
    
    async actualizarPersona(id, alias, clave, estado, [roles]){
        let tokenLogin = this.validarInfoToken();
        const response = await axios.put(this.baseUrl + '/usuarios/' + id, {
            "alias": alias,
            "clave": clave,
            "estado": estado,
            "roles": [roles]
        }, {
            headers : {
                'Authorization': tokenLogin
            }
        });
        return response.data;
    }
    
    async eliminarPersona(id){
        let tokenLogin = this.validarInfoToken();
        const response = await axios.delete(this.baseUrl + '/usuarios/' + id, {
            headers : {
                'Authorization': tokenLogin
            }
        });
        return response.data;
    }
    
    validarInfoToken() {
        let tokenLogin = new LoginService().obtenerToken();
        if(tokenLogin === null){
            throw new Error("Se requiere loguearse");
        }
        return tokenLogin;
    }
}