import React, { Component } from 'react';
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { Captcha } from 'primereact/captcha';
import { Button } from 'primereact/button';
import { LoginService } from '../../api/service/LoginService';
import "./Login.css";

class Login extends Component {

    constructor(){
        super();
        this.state = {
            usuario: '',
            password: ''
        }
        this.loginService = new LoginService();
    }

    handleChangeText = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        try {
            event.preventDefault();
            let alias = this.state.usuario;
            let clave = this.state.password;
            let captcha = window.grecaptcha.getResponse();
            // ejecuto una promesa
            this.loginService.loguear(alias, clave, captcha).then(data => {
                console.log('👉 Returned data:', data);
            });
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