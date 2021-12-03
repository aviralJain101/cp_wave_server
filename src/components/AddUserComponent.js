import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


class AddUsers extends Component {
    constructor(props) {
        super(props);
       }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>AddUsers</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Users</h3>
                        <hr />
                    </div>
                </div>
                
            </div>
        );

    }
}

export default AddUsers;