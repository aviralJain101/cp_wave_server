import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardText, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from '../LoadingComponent';
import { baseUrl } from '../../shared/baseUrl';
import Avatar from 'react-avatar';
import Chatitem from './helperComponent/ChatComponent';
import RenderMessageBOX from './helperComponent/RenderMessageBox';
import RenderUserPage from '../AddUsers/RenderUserPageComponent';


class Chat extends Component {
    constructor(props) {
        super(props);
       }

    render() {

        return (
            <div className="container" style={{maxHeight:'75vh'}}>
                {/* {alert(this.props.friends.friends)} */}
                {/* <div className="row">
                    <h4>Chat</h4>
                    <hr />
                </div> */}
                {/* <card> */}
                <div className="row mt-4 card flex-row" style={{maxHeight:'75vh'}}>
                    {/* <Card> */}
                        <div className="col-6 col-lg-5" style={{maxHeight:'75vh'}}>
                            <Chatitem 
                                // fetchFriends={this.props.fetchFriends}
                                friends={this.props.friends}
                            />
                        </div>
                        <div className="col-6 col-lg-7">
                            MessageBox
                        </div>
                        
                    {/* </Card> */}
                </div> 
                {/* </card> */}
                               
            </div>            
        );

    }
}

export default Chat;