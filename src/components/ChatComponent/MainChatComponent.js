import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardText, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from '../LoadingComponent';
import { baseUrl } from '../../shared/baseUrl';
import Avatar from 'react-avatar';
import RenderMessageBOX from './helperComponent/RenderMessageBox';
import { ChatItem } from 'react-chat-elements'
import { ChatList } from 'react-chat-elements'
import { SideBar } from 'react-chat-elements'
import { Navbar } from 'react-chat-elements'
import { MessageList } from 'react-chat-elements'
import { Popup } from 'react-chat-elements'


class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.handleOnclick=this.handleOnclick.bind(this);
    }

    handleOnclick(friend) {
        this.setState({
            user: friend
        });
    }

    render() {

        const FrontPage = this.props.friends.friends.map((friend) => {
            return (
                    <ChatItem
                        avatar={'https://facebook.github.io/react/img/logo.svg'}
                        alt={'Reactjs'}
                        title={friend.username}
                        subtitle={'What are you doing?'}
                        date={new Date()}
                        unread={10}
                        onClick={() => this.handleOnclick(friend.username)}
                        
                    />                
            );
        });


        return (
            <div className="container" style={{height:'75vh'}}>
                <div className="row mt-4 card flex-row" style={{height:'75vh'}}>
                    <div className="col-6 col-lg-5 scrollbar" style={{maxHeight:'75vh'}}>
                        {FrontPage}
                    </div>
                        
                    <div className="col-6 col-lg-7 style={{Height:'75vh'}}">
                    {
                        this.state.user ?
                            <SideBar
                                top={
                                    <div>
                                        
                                        <ChatItem
                                            avatar={'https://facebook.github.io/react/img/logo.svg'}
                                            alt={'Reactjs'}
                                            title={this.state.user}
                                            subtitle={'Notify Online/Offline'}
                                            date={new Date()}
                                            unread={10} 
                                            />
                                    </div>
                                }
                                center={
                                    <div className="scrollbar" style={{maxHeight:'55vh'}}>
                                        <MessageList
                                            className='message-list'
                                            lockable={true}
                                            toBottomHeight={'100%'}
                                            dataSource={[
                                                {
                                                    position: 'right',
                                                    type: 'text',
                                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                                    date: new Date(),
                                                },{
                                                    position: 'left',
                                                    type: 'text',
                                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                                    date: new Date(),
                                                },{
                                                    position: 'right',
                                                    type: 'text',
                                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                                    date: new Date(),
                                                },{
                                                    position: 'left',
                                                    type: 'text',
                                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                                    date: new Date(),
                                                },{
                                                    position: 'right',
                                                    type: 'text',
                                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                                    date: new Date(),
                                                },{
                                                    position: 'left',
                                                    type: 'text',
                                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                                    date: new Date(),
                                                },{
                                                    position: 'right',
                                                    type: 'text',
                                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                                    date: new Date(),
                                                },{
                                                    position: 'left',
                                                    type: 'text',
                                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                                    date: new Date(),
                                                },{
                                                    position: 'right',
                                                    type: 'text',
                                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                                    date: new Date(),
                                                },{
                                                    position: 'left',
                                                    type: 'text',
                                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                                    date: new Date(),
                                                },{
                                                    position: 'right',
                                                    type: 'text',
                                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                                    date: new Date(),
                                                },{
                                                    position: 'left',
                                                    type: 'text',
                                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                                    date: new Date(),
                                                },{
                                                    position: 'left',
                                                    type: 'text',
                                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                                    date: new Date(),
                                                },{
                                                    position: 'right',
                                                    type: 'text',
                                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                                    date: new Date(),
                                                },{
                                                    position: 'left',
                                                    type: 'text',
                                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                                    date: new Date(),
                                                },{
                                                    position: 'right',
                                                    type: 'text',
                                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                                    date: new Date(),
                                                },{
                                                    position: 'left',
                                                    type: 'text',
                                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                                    date: new Date(),
                                                },{
                                                    position: 'right',
                                                    type: 'text',
                                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                                    date: new Date(),
                                                },{
                                                    position: 'left',
                                                    type: 'text',
                                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                                    date: new Date(),
                                                }
                                            ]} />
                                    </div>
                                }
                                bottom={
                                    <div><RenderMessageBOX /></div>
                                }
                            />:
                            <SideBar />
                        }
                    </div>
                </div>                               
            </div>            
        );

    }
}

export default Chat;