import React, { Component } from 'react';
import 'react-chat-elements/dist/main.css';
import { MessageBox } from 'react-chat-elements';


import { ChatItem } from 'react-chat-elements'


class Chatitem extends Component {
    constructor(props) {
        super(props);
       }

    render() {

        const FrontPage = ['facebook','google','snapchat','whatsapp'].map((user) => {
            return (
                <ChatItem
                    avatar={'https://facebook.github.io/react/img/logo.svg'}
                    alt={'Reactjs'}
                    title={user}
                    subtitle={'What are you doing?'}
                    date={new Date()}
                    unread={10}
                />
            );
        });

        return (
            <div>
                {FrontPage}
            </div>
        );
    }
}

export default Chatitem;