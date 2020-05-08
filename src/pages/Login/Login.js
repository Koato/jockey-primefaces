import React, {Component} from 'react';
import "./Login.css";
import {Card} from 'primereact/card';
import {InputText} from "primereact/inputtext";
import {Captcha} from 'primereact/captcha';
import {Button} from 'primereact/button';
import axios from "axios";

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            usuario: '',
            password: ''
        }
    }

    handleChangeText = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let alias = this.state.usuario;
        let clave = this.state.password;
        try {
            let captcha = window.grecaptcha.getResponse();
            const response = await axios.post('https://jockey-web.herokuapp.com/login', {
            // const response = await axios.post('http://localhost:7559/login', {
                'alias': alias,
                'clave': clave,
                'captchaResponse': captcha
            });
            console.log('👉 Returned data:', response);
            if (response.status === 200) {
                console.log('Almacenando el token en el LocalStorage...');
                localStorage.setItem("user_jck_token", response.data.token);
                console.log('Obteniendo el token del LocalStorage...');
                console.log(localStorage.getItem("user_jck_token"));
                console.log('Eliminando el token del LocalStorage...');
                localStorage.removeItem("user_jck_token");
                console.log('Obteniendo el token del LocalStorage...');
                console.log(localStorage.getItem("user_jck_token"));
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    render(){
        return(
            <div className="padre content-section implementation">
                <Card title="Acceso al sistema" subTitle="Ingrese sus credenciales" className="cardLogin ui-card-shadow">
                    <form onSubmit={this.handleSubmit}>
                        <div className="content-section implementation">
                            <div className="p-col-12 p-md-4">
                                <div className="p-inputgroup">
                                    <InputText onChange={this.handleChangeText} value={this.state.usuario} name="usuario" autoComplete="off" placeholder="Usuario" size="34" />
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                </div>
                            </div>
                            <br />
                            <div className="p-col-12 p-md-4">
                                <div className="p-inputgroup">
                                <InputText onChange={this.handleChangeText} value={this.state.password} name="password" autoComplete="off" type="password" placeholder="Clave de acceso" size="34" />
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-lock"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="content-section implementation button-demo">
                            <Captcha id="captcha" size="normal" language="es" theme="light" siteKey="6LeEvFsUAAAAALqEXVMvulgVYRfNdcJdJKbCq6gO" />
                        </div>
                        <br />
                        <Button type="submit" label="Acceder" className="p-button-raised p-button-primary" />
                        <p>Olvidaste la contraseña? Recuperar clave</p>
                    </form>
                </Card>
            </div>
        );
    }
}

export default Login;