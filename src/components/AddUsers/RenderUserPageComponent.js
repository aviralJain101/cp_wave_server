import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
// import { Loading } from '../LoadingComponent';
// import { baseUrl } from '../../shared/baseUrl';




class RenderUserPage extends Component {
    constructor(props) {
        super(props);
       }

    

    render() {
        return (
            <div>
                <Card bg="primary" text="white" style={{ width: '18rem' }}>
                    <Card.Header>Header</Card.Header>
                    <Card.Body>
                    <Card.Title>Primary Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                    </Card.Body>
                </Card>
                <br />
            </div>
        );

    }
}

export default RenderUserPage;