import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import RenderItems from './RenderItems';


class Purchased extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Purchased</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-4">
                            <h3>Items</h3>
                            <hr />
                        </div>
                        <div>
                            {
                                (this.props.purchasedItem.items == null || this.props.purchasedItem.items.length == 0)?
                                <h4>Purchased List is Empty</h4>:
                                <RenderItems
                                    purchasedItem={this.props.purchasedItem}
                                />
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );

    }
}

export default Purchased;