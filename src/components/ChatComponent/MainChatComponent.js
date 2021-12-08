import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardText, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from '../LoadingComponent';
import { baseUrl } from '../../shared/baseUrl';
import Avatar from 'react-avatar';
import Chatitem from './ChatComponent';

class Chat extends Component {
    constructor(props) {
        super(props);
       }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <h4>Chat</h4>
                    <hr />
                </div>
                <div className="row">
                    <Chatitem />
                </div>
            </div>
        );

    }
}

export default Chat;