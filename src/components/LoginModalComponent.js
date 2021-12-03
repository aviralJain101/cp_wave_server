import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import FBLogin from './Logins/FacebookLoginComponent';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem,CardBody, CardHeader } from 'reactstrap';
import GLogin from './Logins/GoogleLoginComponent';
import LoginModal from './ModalsComponents/LoginModal';


class ModelPop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleLogin(event) {
        this.toggleModal();
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();

    }

    render() {
        return(

            <React.Fragment>

                <Button primary onClick={this.toggleModal} style={{borderRadius:'20px'}}>
                    <span className="fa fa-sign-in fa-lg"></span> Login
                    {this.props.auth.isFetching ?
                        <span className="fa fa-spinner fa-pulse fa-fw"></span>
                        : null
                    }
                </Button>

                <LoginModal isModalOpen={this.state.isModalOpen} 
                    toggleModal={this.toggleModal}
                    handleForgotPassword={this.handleLogin}
                    />
            </React.Fragment>
        );
    }
}

export default ModelPop;