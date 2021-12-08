import React, { Component } from 'react';
import 'react-chat-elements/dist/main.css';
import { MessageBox } from 'react-chat-elements';
import RenderMessageBOX from './RenderMessageBox';

import { ChatItem } from 'react-chat-elements'


class Chatitem extends Component {
    constructor(props) {
        super(props);
        this.handleOnclick=this.handleOnclick.bind(this);
       }

    handleOnclick(user) {
        <RenderMessageBOX user={user} />

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
                    onClick={this.handleOnclick(friend.username)}
                />
            );
        });

        return (
            <div style={{height:'100%'}} className="scrollbar">
                {FrontPage}
            </div>
        );
    }
}

export default Chatitem;