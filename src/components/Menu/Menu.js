import React, {Component} from 'react';
import {BreadCrumb} from 'primereact/breadcrumb';

class Menu extends Component {

    render() {
        const items = [
            {label:'Categories'},
            {label:'Squad'},
            {label:'Lionel Messi', url: '/Lionel_Messi'}
        ];

        const home = {icon: 'pi pi-home', url: '/'}

        return (
            <div className="content-section implementation">
                <BreadCrumb model={items} home={home} />
            </div>
        );
    }
}

export default Menu;