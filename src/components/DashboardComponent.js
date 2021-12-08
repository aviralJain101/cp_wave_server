import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import ProfileLeft from './Dashboard/ProfileLeftComponent';
import ProfileRight from './Dashboard/ProfileRightComponent';
import Avatar from 'react-avatar';

class Dashboard extends Component {
    constructor(props) {
        super(props);
       }

    render() {

        return (
            <div className="container mb-4">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Dashbooard</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Dashbooard</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-4">
                        <ProfileLeft auth={this.props.auth}/>
                    </div>
                    <div className="col-12 col-md-8">
                        <ProfileRight auth={this.props.auth}/>
                    </div>
                </div>
                
            </div>
        );

    }
}

export default Dashboard;