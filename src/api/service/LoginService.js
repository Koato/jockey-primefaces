import axios from 'axios';
import { Token } from '../Token';

export class LoginService {
    // baseUrl = 'http://localhost:7559';
    baseUrl = 'https://jockey-web.herokuapp.com';
    
    token = new Token();
    
    async loguear(alias, clave, captcha){
        const response = await axios.post(this.baseUrl + '/login', {
            'alias': alias,
            'clave': clave,
            'captchaResponse': captcha
        });
        if(response.status === 200){
            this.token.almacenar_localStorage(response.data);
        }
        return response.data.mensaje;
    }

    async desloguear(){
        this.token.borrar_localStorage();
    }

    obtenerToken(){
        try {
            if(this.token.getTokenType()){
                return this.token.getTokenType().concat(" ").concat(this.token.getToken());
            }
        } catch (error) {
            this.token.borrar_localStorage();
        }
        return null;
    }
}