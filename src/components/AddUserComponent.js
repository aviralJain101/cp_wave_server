import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

function RenderUser(user) {
    return(
        <Card>
            {/* <Link to={`/menu/${dish._id}`} > */}
            {/* <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} /> */}
            <CardImgOverlay>
                <CardTitle>{user.username}</CardTitle>
            </CardImgOverlay>
            {/* </Link> */}
        </Card>
    );
}

function Renderusers({searches}) {
    // alert(searches.searchResult);
    if(searches.isLoading) {
        // alert("if");
        return(
            <Loading />
        );
    }
    else if (searches.errMess) {
        return(
            <h4>{searches.errMess}</h4>
        );
    }
    else if(searches.searchResult == null) {
        // alert("else");
        return (
            <div>
                <h3>Type something in the searchBox to show results.</h3>
            </div>
        );
    } 
    else if(searches.searchResult.length == 0) {
        // alert("else");
        return (
            <div>
                <h3>Id's doesn't exist.</h3>
            </div>
        );
    }  
    else if(searches.searchResult){
        // alert("searchResult");
        searches.searchResult.map((user) => {
            return (
                <div key={user._id} className="col-12">
                    <RenderUser user={user} />
                </div>
            );
        });
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
                        
                        <Renderusers searches={this.props.searches} />
                    </div>
                </div>
                
            </div>
        );

    }
}

export default AddUsers;