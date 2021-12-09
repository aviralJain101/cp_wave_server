import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardText, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import Chatitem from './ChatComponent';
import { MessageBox } from 'react-chat-elements'
import { MeetingMessage } from 'react-chat-elements'
import { SystemMessage } from 'react-chat-elements'
import { MessageList } from 'react-chat-elements'
import { Input } from 'react-chat-elements'
import { Button } from 'react-chat-elements'
import { Dropdown } from 'react-chat-elements'

class RenderMessageBOX extends Component {
    constructor(props) {
        super(props);
        this.handleEmojiclick=this.handleEmojiclick.bind(this);
       }
    handleEmojiclick() {
        alert("clicked");
    }

    render() {

        return (
            <div className="container">
                <div className="row">                
                <Input
                    className="chat-input-box"
                    placeholder="Type here..."
                    multiline={true}
                    maxHeight='100'
                    rightButtons={
                        <Button
                            color='grey '
                            backgroundColor='white'
                            text={
                                <i class="fa fa-send fa-lg"></i>
                            }
                            />
                    }
                    // leftButtons={
                    //     <Button
                    //     color='grey '
                    //     backgroundColor='white'
                    //     text={
                    //         <i class="fa fa-home fa-lg"></i>
                    //     }
                    //     onClick={
                    //         this.handleEmojiclick
                    //     }
                    //     />
                    // }
                    
                    
                    />

                {/* inputRef = React.createRef();
                // ...
                <Input
                    ref={el => (this.inputRef = el)}
                    placeholder="Type here..."/>
                // ...
                this.inputRef.clear(); */}


                </div>
            </div>
        );

    }
}

export default RenderMessageBOX;