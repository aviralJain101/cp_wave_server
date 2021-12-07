import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Search from './SearchComponent';
import SearchAS from './SearchASComponent';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem,CardBody, CardHeader } from 'reactstrap';
import ModelPop from './LoginModalComponent';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    handleLogout() {
        this.props.logoutUser();
    }

    
    
    render() {
        const Popup = () => {
            alert(this.props.fetchSuggestions);
        }
        
        return(
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container mt-2">
                        
                        <div className="row">
                            <div className="col-2">
                                <NavbarBrand className="mr-auto" href="/">
                                    <img src="assets/images/logo.png" height="40" width="60"
                                        alt="Ristorante Con Fusion" />
                                </NavbarBrand>
                            </div>
                            <div className="col-7">
                                <SearchAS fetchSearches={this.props.fetchSearches}/>
                            </div>
                            <div className="col-3">
                                { 
                                    this.props.auth.isAuthenticated ?
                                    // <div>
                                        <span className="navbar-text pull-right" style={{color:'#fff'}}>{this.props.auth.user.username}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        
                                    // </div>
                                    :
                                    null
                                    }
                            </div>
                            
                            <div className="col-12 mt-4 mb-2">
                                <NavbarToggler onClick={this.toggleNav} />
                                <Collapse isOpen={this.state.isNavOpen} navbar>
                                    <Nav navbar>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/home">
                                                <span className="fa fa-home fa-lg"></span> Home
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/addusers">
                                                <span className="fa fa-user-plus fa-lg"></span> Add Users
                                            </NavLink>
                                        </NavItem>
                                        {/* <NavItem>
                                            <NavLink className="nav-link" to="/aboutus">
                                                <span className="fa fa-info fa-lg"></span> About Us
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/menu">
                                                <span className="fa fa-list fa-lg"></span> Menu
                                            </NavLink>
                                        </NavItem> */}
                                        <NavItem>
                                            <NavLink className="nav-link" to="/favorites">
                                                <span className="fa fa-heart fa-lg"></span> My Favorites
                                            </NavLink>
                                        </NavItem>
                                        {/* <NavItem>
                                            <NavLink className="nav-link" to="/contactus">
                                                <span className="fa fa-address-card fa-lg"></span> Contact Us
                                            </NavLink>
                                        </NavItem> */}
                                        <NavItem>
                                            <NavLink className="nav-link" to="/myteams">
                                                <span className="fa fa-users fa-lg"></span> My Teams
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <Nav className="ms-auto" navbar>
                                        <NavItem>
                                            { !this.props.auth.isAuthenticated ?
                                                <ModelPop auth={this.props.auth}
                                                    loginUser={this.props.loginUser} 
                                                    logoutUser={this.props.logoutUser} 
                                                    signupUser={this.props.signupUser}
                                                    />
                                                :
                                                <div>
                                                <Button primary onClick={this.handleLogout} style={{borderRadius:'20px'}}>
                                                    <span className="fa fa-sign-out fa-lg"></span> Logout
                                                    {this.props.auth.isFetching ?
                                                        <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                        : null
                                                    }
                                                    {/* to do
                                                        create a dashboard on ONclick
                                                    */}
                                                </Button>
                                                </div>
                                            }

                                        </NavItem>
                                    </Nav> 
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </Navbar>
                {/* <Jumbotron>
                    <div className="container">
                        <div className="row row-header text-center">
                            <div className="col-6 offset-3">
                                <h1>Bonds</h1>
                                <h5><blockquote>The world isn't perfect. But it's there for us, doing the best it can... that's what makes it so damn beautiful.</blockquote></h5>
                            </div>
                        </div>
                    </div>
                </Jumbotron> */}
            </React.Fragment>
        );
    }
}

export default Header;