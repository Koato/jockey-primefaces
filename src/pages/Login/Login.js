import React, { Component } from 'react';
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { Captcha } from 'primereact/captcha';
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
import { LoginService } from '../../api/service/LoginService';
import Swal from "sweetalert2";
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

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    handleChangeText = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAlerta = (mensaje, titulo = 'Un momento!') => {
        Swal.fire({
            title: titulo,
            text: '' + mensaje,
            icon: 'error'
        });
    }

    handleSubmit = (event) => {
        try {
            event.preventDefault();
            let captcha = window.grecaptcha.getResponse();
            if(captcha){
                let alias = this.state.usuario;
                let clave = this.state.password;
                // ejecuto una promesa
                this.loginService.loguear(alias, clave, captcha).then(data => {
                    // console.log('👉 Returned data:', data);
                    Swal.fire({
                        title: 'Bienvenido',
                        text: data,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1700
                    });
                    this.timerID = setInterval(() => this.props.history.push('/usuarios'), 2000);
                }, error => {
                    this.handleAlerta(error);
                    window.grecaptcha.reset();
                    // console.log(`😱 Axios request failed: ${error}`);
                });
            }else{
                this.handleAlerta("El captcha no ha sido contestado");
            }
        } catch (e) {
             if(e.message === 'No reCAPTCHA clients exist.'){
                this.handleAlerta("Se procederá a actualizar la página", "El captcha no ha sido cargado");
                this.timerID = setInterval(() => window.location.reload(), 3000);
             }
        }
    }

    render(){
        return(
            <div className="padre content-section implementation">
                <Card title="Acceso al sistema" subTitle="Ingrese sus credenciales" className="cardLogin ui-card-shadow">
                    <form onSubmit={this.handleSubmit}>
                        <div className="content-section implementation">
                            <br />
                            <div className="p-col-12 p-md-4">
                                <div className="p-float-label p-inputgroup">
                                    <InputText id="txtusuario" name="usuario" required="required" onChange={this.handleChangeText} value={this.state.usuario} autoComplete="off" size="34" />
                                    <label htmlFor="txtusuario">Usuario</label>
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className="p-col-12 p-md-4">
                                <div className="p-float-label p-inputgroup">
                                    <InputText id="txtclave" name="password" required="required" onChange={this.handleChangeText} value={this.state.password} autoComplete="off" type="password" size="34" />
                                    <label htmlFor="txtclave">Clave de acceso</label>
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-lock"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="content-section implementation button-demo">
                            <Captcha id="captcha" className="g-recaptcha" size="normal" language="es" theme="light" siteKey="6LeEvFsUAAAAALqEXVMvulgVYRfNdcJdJKbCq6gO" />
                        </div>
                        <br />
                        <Button type="submit" label="Acceder" className="p-button-raised p-button-primary" />
                        <p>
                            Olvidaste la contraseña? 
                            <Link className="App-link" style={{margin: "0 10px"}} to="/usuarios">
                                Recuperar clave
                            </Link>
                        </p>
                    </form>
                </Card>
            </div>
        );
    }
}

export default Login;