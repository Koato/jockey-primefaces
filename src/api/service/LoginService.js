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
        }).catch(e => {
            return e.response;
        });
        if(response.status === 200){
            this.token.almacenar_localStorage(response.data);
            return response.data.mensaje;
        }
        if(response.status === 401){
            throw response.data.mensaje;
        }
    }

    async desloguear(){
        this.token.borrar_localStorage();
    }

    obtenerToken(){
        try {
            if(this.token.getTokenType() && this.token.getToken()){
                return this.token.getTokenType().concat(" ").concat(this.token.getToken());
            }else{
                this.desloguear();
            }
        } catch (error) {
            this.desloguear();
        }
        return null;
    }
}