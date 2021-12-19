import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Accordion, Button } from 'react-bootstrap';
import RenderItems from './RenderItems';


class Buy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreateModalOpen: false
        }
    }
    toggleModalCreate = (event) => {
        // event.preventDefault();
        this.setState({
            isCreateModalOpen: !this.state.isCreateModalOpen
        });
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Market</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-4">
                            <h3>Items</h3>
                            <hr />
                        </div>
                        <div>
                            <RenderItems
                                marketItem={this.props.marketItem}
                                buyItem={this.props.buyItem}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );

    }
}

export default Buy;