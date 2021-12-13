import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import FBLogin from '../SocialLogins/FacebookLoginComponent';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem,CardBody, CardHeader } from 'reactstrap';
import GLogin from '../SocialLogins/GoogleLoginComponent';
import { th } from 'react-html-attributes';

class SignUpModal extends Component {

    constructor(props) {
        super(props);
        this.handleSignup=this.handleSignup.bind(this);
    }

    handleSignup(event) {
        // alert(this.props.signupUser);
        this.props.toggleModal();
        this.props.signupUser({firstname: this.firstname.value, lastname:this.lastname.value, username: this.usernames.value, password: this.passwords.value, email: this.email.value});
        event.preventDefault();
    }

    render() {
        return(

            <React.Fragment>
                <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal} centered>
                    <ModalHeader toggle={this.props.toggleModal}>Register</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSignup}>

                            <FormGroup>
                                <Label htmlFor="firstname">First Name</Label>
                                <Input type="text" id="firstname" name="firstname"
                                    innerRef={(input) => this.firstname = input} 
                                    required/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="lastname">Last Name</Label>
                                <Input type="text" id="lastname" name="lastname"
                                    innerRef={(input) => this.lastname = input} 
                                    required/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="text" id="email" name="email"
                                    innerRef={(input) => this.email = input} 
                                    required/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="usernames">Username</Label>
                                <Input type="text" id="usernames" name="usernames"
                                    innerRef={(input) => this.usernames = input} 
                                    required/>
                            </FormGroup>

                            <FormGroup className="mt-2">
                                <Label htmlFor="passwords">Password</Label>
                                <Input type="password" id="passwords" name="passwords"
                                    innerRef={(input) => this.passwords = input}  
                                    required/>
                            </FormGroup>
                            {/* <FormGroup check className="mt-2">
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                                
                            </FormGroup> */}
                            <FormGroup className="text-center mt-2 mb-3">
                                <Button type="submit" value="submit" color="primary">Register</Button>
                            </FormGroup>
                            <FormGroup className="mb-2">
                                <FBLogin />
                            </FormGroup>
                            <FormGroup className="mb-2">
                                <GLogin />
                            </FormGroup>
                            <FormGroup className="text-center">
                                <Label>
                                    Already have an account?
                                </Label>
                                <Label>
                                    <a onClick={this.props.changeModal} className="nav-link">Login</a>
                                </Label>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default SignUpModal;