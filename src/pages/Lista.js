import React, { Component } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PersonaService } from "../api/service/PersonaServices";

class Lista extends Component {
    constructor(){
        super();
        this.state = {
            usuarios: null
        }
        this.personaServices = new PersonaService();
    }

    componentDidMount(){
        this.personaServices.listarTodo().then(data => {
            this.setState({
                usuarios: data.content
            });
            console.log(data.content);
        });
    }

    render(){
        return(
            <div>
                <Card title="Lista de usuarios" style={{width: '80%', margin: '0 auto', marginTop: '40px'}} className="ui-card-shadow">
                    <DataTable value={this.state.usuarios}>
                        <Column field="id" header="ID" />
                        <Column field="alias" header="Alias" />
                        <Column field="tiempoAcceso" header="Fecha de acceso" />
                        <Column field="roles" header="Roles" />
                    </DataTable>
                </Card>
            </div>
        );
    }
}

export default Lista;