import React, { Component } from "react";
import { Card } from 'primereact/card';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Lista from "./Lista";
import Contacto from "./Contacto";
import Login from "./Login/Login";
import NotFound from "./errors/NotFound";
import "../App.css";

class Welcome extends Component {

    render(){        
        return(
            <Card title="Seleccione una ruta"  style={{width: '80%', margin: '0 auto'}} className="App-header ui-card-shadow">
                <BrowserRouter>
                    <div>
                        <Link className="App-link" style={{margin: "0 10px"}} to="/">
                            Login
                        </Link>
                        <Link className="App-link" style={{margin: "0 10px"}} to="/usuarios">
                            Lista
                        </Link>
                        <Link className="App-link" style={{margin: "0 10px"}} to="/contacto">
                            Contacto
                        </Link>
                    </div>
                    {/* establesco las rutas que voy a manejar */}
                    <Switch>
                        {/* indico que mostrar en la ruta principal o vacia */}
                        <Route exact path="/" component={Login} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/usuarios" component={Lista} />
                        <Route exact path="/contacto" component={Contacto} />
                        {/* en caso de no encontrar una ruta */}
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </Card>
        );
    }
}

export default Welcome;