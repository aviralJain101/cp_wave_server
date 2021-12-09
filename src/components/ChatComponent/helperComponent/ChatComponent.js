import React, { Component } from 'react';
import 'react-chat-elements/dist/main.css';
import { MessageBox } from 'react-chat-elements';
import RenderMessageBOX from './RenderMessageBox';
import { SideBar } from 'react-chat-elements'


class Chatitem extends Component {
    constructor(props) {
        super(props);
        this.handleOnclick=this.handleOnclick.bind(this);
       }

    handleOnclick(user) {
        <RenderMessageBOX user={user} />

    }

    render() {



        

        return (
            <div style={{height:'100%'}} className="scrollbar">
                <SideBar
                    top={
                        <div>'TOP' area</div>
                    }
                    center={
                        <div>'CENTER' area</div>
                    }
                    bottom={
                        <div>'BOTTOM' area</div>
                    }/>
            </div>
        );
    }
}

export default Chatitem;