import React, {Component} from 'react';
import {Card} from 'primereact/card';

class Tarjeta extends Component {

    render() {
        return (
            <div className="content-section implementation">
                <Card title="Simple Card" subTitle="Subtitle" style={{width: '360px'}} className="ui-card-shadow">
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                        quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
                </Card>
            </div>
        )
    }
}

export default Tarjeta;