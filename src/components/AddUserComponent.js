import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Fade, Stagger } from 'react-animation-components';

function RenderUser({user}) {
    return(
        <Media>
            {/* <Media left middle>
                <Media object src={baseUrl + leader.image} alt={leader.name} />
            </Media> */}
            <Media body className="ml-5">
                <Media heading>{user.username}</Media>
                {/* <p>{user.designation}</p>
                <p>{user.description}</p> */}
            </Media>
        </Media>
    );
}

function Renderusers({isLoading, errMess, searchResult, searchTerm}) {
    // alert(isLoading);
    if(isLoading) {
        // alert("if");
        return(
            <Loading />
        );
    }
    else if (errMess) {
        return(
            <h4>{errMess}</h4>
        );
    }
    else if(searchResult == null) {
        // alert("else");
        return (
            <div>
                <h3>Type something in the searchBox to show results.</h3>
            </div>
        );
    } 
    else if(searchResult.length == 0) {
        // alert("else");
        return (
            <div>
                <h3>Id's doesn't exist.</h3>
            </div>
        );
    }  
    else if(searchResult){
        // alert(searchResult.length);
        const users = searchResult.map((user) => {
            // alert(user.username);
            return (
                // <Fade in key={user._id}>
                    <div className="col-12 mt-2">
                        {/* {user.username} */}
                            <RenderUser user={user} />
                    </div>
                // </Fade>
            );
        });

        return (
            <div>
                {users}
            </div>
        );
    }
    
}


class AddUsers extends Component {
    constructor(props) {
        super(props);
       }

    


    render() {
        // alert(this.props.searches.isLoading);
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>AddUsers</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        
                        <Renderusers 
                        isLoading={this.props.searches.isLoading}
                        errMess={this.props.searches.errMess}
                        searchResult={this.props.searches.searchResult}
                        searchTerm={this.props.searches.searchTerm} />
                    </div>
                </div>
                
            </div>
        );

    }
}

export default AddUsers;