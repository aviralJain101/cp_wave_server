import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../shared/baseUrl';
import { Loading } from '../LoadingComponent';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardText, CardTitle} from 'reactstrap';
import { Fade, Stagger } from 'react-animation-components';
import ScrollComponent from './InfiniteScroll';
import axios from "axios";

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
        const users = searchResult.map((user) => {
            return (
                    <div className="col-12 mt-2">
                        <RenderUser user={user} />
                    </div>
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
        this.state = {
            photos: [],
            loading: false,
            page: 0,
            prevY: 0,
            hasMore: true
          };
       }

       componentDidMount() {
        this.getPhotos(this.state.page);
    
        var options = {
          root: null,
          rootMargin: "0px",
          threshold: 1.0
        };
        
        this.observer = new IntersectionObserver(
          this.handleObserver.bind(this),
          options
        );
        this.observer.observe(this.loadingRef);
      }

       getPhotos(page) {
        this.setState({ loading: true });

        const bearer = 'Bearer ' + localStorage.getItem('token');
        fetch(baseUrl+'search?searchTerm='+this.props.searches.searchTerm+'&page='+page,{
            headers: {
                'Authorization': bearer
            },
        })
        .then(response => response.json())
        .then(searchResult => {
            this.setState({ photos: [...this.state.photos, ...searchResult] });
            console.log(searchResult);
            this.setState({ loading: false });
            if(searchResult.length < 6){
                this.setState({hasMore: false});
            }
            console.log(this.state.hasMore)
            // alert(searchResult.length);
        })
        
        
      }

     

      handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
          const lastPhoto = this.state.photos[this.state.photos.length - 1];
          const curPage = lastPhoto._id;
          this.getPhotos(curPage);
          this.setState({ page: curPage });
        }
        this.setState({ prevY: y });
      }
    

      render() {

        // Additional css
        const loadingCSS = {
          height: "400px",
          margin: "30px"
        };
    
        // To change the loading icon behavior
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

    return (
        <div className="container">
        <div style={{ minHeight: "800px" }}>
            {this.state.photos.map(user => (
                <RenderUser user={user} />
            ))}
        </div>
        <div
            ref={loadingRef => (this.loadingRef = loadingRef)}
            style={loadingCSS}
        >
            <span style={loadingTextCSS}>Loading...</span>
        </div>
        </div>
    );
    }

    // render() {
    //     // alert(this.props.searches.isLoading);
    //     return (
    //         <div className="container">
    //             <div className="row">
    //                 <Breadcrumb>
    //                     <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
    //                     <BreadcrumbItem active>AddUsers</BreadcrumbItem>
    //                 </Breadcrumb>
    //                 <div className="col-12">
                        
    //                     <Renderusers 
    //                     isLoading={this.props.searches.isLoading}
    //                     errMess={this.props.searches.errMess}
    //                     searchResult={this.props.searches.searchResult}
    //                     searchTerm={this.props.searches.searchTerm} />
    //                 </div>
    //             </div>
                
    //         </div>
    //     );

    // }
}

export default AddUsers;