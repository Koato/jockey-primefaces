import React, {Component} from 'react';
import "./Login.css";
import {Card} from 'primereact/card';
import {InputText} from "primereact/inputtext";
import {Captcha} from 'primereact/captcha';
import {Button} from 'primereact/button';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            alias: '',
            clave: ''
        }
    }

    showResponse(response) {
        console.log("Validacion Captcha respondida");
    }

    render(){
        return(
            <div className="padre content-section implementation">
                <Card title="Acceso al sistema" subTitle="Ingrese sus credenciales" className="cardLogin ui-card-shadow">
                    <form onSubmit>
                        <div className="content-section implementation">
                            <div className="p-col-12 p-md-4">
                                <div className="p-inputgroup">
                                    <InputText placeholder="Usuario" size="34" />
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                </div>
                            </div>
                            <br />
                            <div className="p-col-12 p-md-4">
                                <div className="p-inputgroup">
                                    <InputText type="password" placeholder="Password" size="34" />
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-lock"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="content-section implementation button-demo">
                            {/* <Captcha id="captcha" size="34" language="es" theme="light" siteKey="6LeEvFsUAAAAALqEXVMvulgVYRfNdcJdJKbCq6gO" onResponse={this.showResponse} /> */}
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