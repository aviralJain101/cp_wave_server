import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardText, CardTitle} from 'reactstrap';
import { Fade, Stagger } from 'react-animation-components';

function RenderUser({user}) {
    return(
        <Card bg="primary" text="white" style={{ width: '1%00' }}>
            <CardHeader>{user.username}</CardHeader>
            <CardBody>
            <CardTitle>Primary Card Title</CardTitle>
            <CardText>
                Some quick example text to build on the card title and make up the bulk
                of the card's content.
            </CardText>
            </CardBody>
        </Card>
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