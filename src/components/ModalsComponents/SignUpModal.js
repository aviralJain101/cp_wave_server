import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import FBLogin from '../Logins/FacebookLoginComponent';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem,CardBody, CardHeader } from 'reactstrap';
import GLogin from '../Logins/GoogleLoginComponent';
import { th } from 'react-html-attributes';

class SignUpModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
       
    }

    render() {
        return(

            <React.Fragment>

                <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal} centered>
                    <ModalHeader toggle={this.props.toggleModal}>Register</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.props.handlesignup}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="text" id="email" name="email"
                                    innerRef={(input) => this.email = input} />
                            </FormGroup>
                            <FormGroup className="mt-2">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup check className="mt-2">
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                                
                            </FormGroup>
                            <FormGroup className="d-flex justify-content-center mt-2 mb-3">
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