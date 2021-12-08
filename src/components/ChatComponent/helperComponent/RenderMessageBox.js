import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardText, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import Chatitem from './ChatComponent';

class RenderMessageBOX extends Component {
    constructor(props) {
        super(props);
       }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <h4>MessageBox</h4>
                    <hr />
                </div>
            </div>
        );

    }
}

export default RenderMessageBOX;