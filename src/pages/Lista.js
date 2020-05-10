import React, { Component } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { PersonaService } from "../api/service/PersonaServices";

class Lista extends Component {

    constructor(){
        super();
        this.state = {
            usuarios: null,
            loading: true
        }
        this.personaServices = new PersonaService();
    }

    componentDidMount() {
        this.personaServices.listarTodo().then(data => {
            this.setState({
                usuarios: data.content,
                loading: false
            });
        }).catch(err => {
            console.log(err);
            this.props.history.push('/login');
        });
    }

    export = (e) => {
        this.data.exportCSV();
    }
    
    render(){
        var header = <div style={{textAlign:'left'}}><Button className="p-button-raised p-button-success" icon="pi pi-external-link" iconPos="left" label="CSV" onClick={this.export}></Button></div>;

        return(
            <div>
                <Card title="Lista de usuarios" style={{width: '80%', margin: '0 auto', marginTop: '40px'}} className="ui-card-shadow">
                    <DataTable
                    // valor de la tabla
                    value={this.state.usuarios}
                    // exportar csv
                    header={header} ref={(e) => { this.data = e; }} 
                    // hacer scroll y tamaño de la tabla
                    scrollable={true} scrollHeight="200px"
                    //se adapta al tamaño de la pantalla
                    responsive={true}
                    // paginacion
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    paginator={true} rows={7} currentPageReportTemplate="Mostrando {last} de {totalRecords} registros"
                    loading={this.state.loading}
                    // ordenamiento multiple
                    sortMode="multiple" >
                        <Column field="id" header="ID" />
                        <Column field="alias" header="Alias" sortable={true} />
                        <Column field="tiempoAcceso" header="Fecha de acceso" sortable={true} />
                        <Column field="roles" header="Roles" sortable={true} />
                    </DataTable>
                </Card>
            </div>
        );
    }
}

export default Lista;