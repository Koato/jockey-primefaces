import axios from 'axios';
import { LoginService } from './LoginService';

export class PersonaService {
    // baseUrl = 'http://localhost:7559';
    baseUrl = 'https://jockey-web.herokuapp.com';
    
    tokenLogin = new LoginService().obtenerToken();
    
    async listarTodo(){
        this.validarInfoToken();
        const response = await axios.get(this.baseUrl + '/usuarios', {
            headers : {
                'Authorization': this.tokenLogin
            }
        });
        return response.data;
    }

    async listarId(id){
        this.validarInfoToken();
        const response = await axios.get(this.baseUrl + '/usuarios/' + id, {
            headers : {
                'Authorization': this.tokenLogin
            }
        });
        return response.data;
    }

    async crearPersona(alias, clave, estado, [roles]){
        this.validarInfoToken();
        const response = await axios.post(this.baseUrl + '/usuarios', {
            "alias": alias,
            "clave": clave,
            "estado": estado,
            "roles": [roles]
        }, {
            headers : {
                'Authorization': this.tokenLogin
            }
        });
        return response.data;
    }

    async actualizarPersona(id, alias, clave, estado, [roles]){
        this.validarInfoToken();
        const response = await axios.put(this.baseUrl + '/usuarios/' + id, {
            "alias": alias,
            "clave": clave,
            "estado": estado,
            "roles": [roles]
        }, {
            headers : {
                'Authorization': this.tokenLogin
            }
        });
        return response.data;
    }

    async eliminarPersona(id){
        this.validarInfoToken();
        const response = await axios.delete(this.baseUrl + '/usuarios/' + id, {
            headers : {
                'Authorization': this.tokenLogin
            }
        });
        return response.data;
    }

    validarInfoToken() {
        if(this.tokenLogin === null){
            throw new Error("Se requiere loguearse");
        }
    }
}