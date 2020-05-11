import React, { Component } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { PersonaService } from "../api/service/PersonaServices";
import { Chips } from 'primereact/chips';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import Swal from "sweetalert2";

class Lista extends Component {

    constructor(){
        super();
        this.state = {
            usuarios: null,
            loading: true,
            selected: null,
            usuario: {
                id: '',
                alias: '',
                clave: '',
                estado: '',
                roles: []
            },
            displayDialog: false
        }
        this.personaServices = new PersonaService();
    }

    componentDidMount() {
        this.personaServices.listarTodo().then(data => {
            this.setState({
                usuarios: data.content,
                loading: false
            });
        }, error => {
            Swal.fire({
                title: 'Alto!',
                text: error,
                icon: 'error',
                showConfirmButton: false,
                timer: 1700
            });
            this.timerID = setInterval(() => this.props.history.push('/login'), 2000);
            console.log(`😱 Axios request failed: ${error}`);
        });
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    validarContenido = () => {
        const user = this.state.usuario;
        let falta = 0;
        if(user.alias === ''){
            falta++;
        }
        if(user.clave === ''){
            falta++;
        }
        if(user.alias === ''){
            falta++;
        }
        if(user.estado === ''){
            falta++;
        }
        if(user.roles === ''){
            falta++;
        }
        return falta;
    }

    handleMostrarAlerta(titulo, texto) {
        Swal.fire({
            title: titulo,
            text: '' + texto,
            icon: 'error'
        });
    }

    nuevo = () => {
        let faltantes = this.validarContenido();
        if(faltantes === 0){
            let usuarios = [...this.state.usuarios];
            this.personaServices.crearPersona(this.state.usuario).then(data => {
                console.log(data);
                usuarios.push(data.usuario);
                this.setState({
                    usuarios,
                    usuario: {
                        id: '',
                        alias: '',
                        clave: '',
                        estado: '',
                        roles: []
                    },
                    displayDialog:false
                });
            }, error => {
                if(error.message === "Se requiere loguearse"){
                    console.log("Problemas con el token en storage");
                    this.handleMostrarAlerta("Alto!", 'Se requiere loguearse');
                }
                if(error.response.status === 400){
                    let err = '';
                    error.response.data.errors.forEach(e => {
                        err += " » " + e;
                    });
                    this.handleMostrarAlerta("No podemos guardarlo!", err);
                }
            });
        }else{
            this.handleMostrarAlerta("No podemos continuar...", 'Tiene al menos un campo sin datos');
        }
    }

    // actualizar = () => {
        
    // }
    
    // eliminar = () => {
        
    // }

    handleChangeText = (event) => {
        let usuario = this.state.usuario;
        usuario[event.target.name] = event.target.value;
        this.setState({usuario});
    }

    handleExport = (e) => {
        this.data.exportCSV();
    }
    
    render(){
        var header = <div style={{textAlign:'left'}}>
                        <Button className="p-button-raised p-button-success" icon="pi pi-external-link" 
                        iconPos="left" label="Exportar en CSV" onClick={this.handleExport} />
                    </div>;
        let footer = <div>
                        <Button style={{float:'left'}} className="p-button-raised p-button-primary" label="Agregar" icon="pi pi-plus" onClick={() => this.setState({displayDialog: true})} />
                        <Button style={{color:'white'}} className="p-button-raised p-button-warning" label="Modificar" icon="pi pi-user-edit" onClick={this.actualizar} />
                        <Button style={{float:'right'}} className="p-button-raised p-button-danger" label="Eliminar" icon="pi pi-trash" onClick={this.eliminar} />
                    </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                            <Button className="p-button-raised p-button-secondary" label="Cancelar" icon="pi pi-times" onClick={() => this.setState({displayDialog: false})} />
                            <Button className="p-button-raised p-button-success" label="Guardar" icon="pi pi-check" onClick={this.nuevo} />
                        </div>;

        const cities = [
            {name: 'Activo', code: true},
            {name: 'Desactivado', code: false}
        ];

        return(
            <>
                <Card title="Lista de usuarios" style={{width: '80%', margin: '0 auto', marginTop: '40px'}} className="ui-card-shadow">
                    <DataTable
                    // valor de la tabla
                    value={this.state.usuarios}
                    // exportar csv
                    header={header} ref={(e) => { this.data = e; }}
                    // agregar registros en footer
                    footer = {footer}
                    // seleccion del registro
                    selectionMode="single"
                    selection={this.state.selected}
                    onSelectionChange={e => this.setState({ selected: e.value })}
                    // onRowSelect={this.onCarSelect}
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
                {/* modal para crear el nuevo usuario */}
                <Dialog visible={this.state.displayDialog} width="300px" header="Detalle de usuario" 
                modal={true} blockScroll={true} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})} >
                    <div className="p-grid p-fluid">
                        <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="alias">Alias</label></div>
                        <div className="p-col-8" style={{padding:'.5em'}}>
                            <InputText name="alias" onChange={this.handleChangeText} value={this.state.usuario.alias}/>
                        </div>

                        <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="clave">Clave</label></div>
                        <div className="p-col-8" style={{padding:'.5em'}}>
                            <Password name="clave" promptLabel="Ingrese su clave"
                            weakLabel="Débil" mediumLabel="Medio débil" strongLabel="Fuerte"
                            tooltip="Procure que su clave tenga «letras, números y símbolos»"
                            onChange={this.handleChangeText} value={this.state.usuario.clave} />
                        </div>

                        <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="estado">Estado</label></div>
                        <div className="p-col-8" style={{padding:'.5em'}}>
                            <Dropdown name="estado" placeholder="Indique el estado" options={cities} 
                            optionLabel="name" optionValue="code"
                            onChange={this.handleChangeText} value={this.state.usuario.estado} />
                        </div>

                        <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="roles">Roles</label></div>
                        <div className="p-col-8" style={{padding:'.5em'}}>
                            <Chips name="roles" separator="," max={3}
                            allowDuplicate={false}
                            tooltip="Separe los valores con «,» o «enter»" 
                            value={this.state.usuario.roles} onChange={this.handleChangeText} />
                        </div>
                    </div>
                </Dialog>
            </>
        );
    }
}

export default Lista;