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

class AddUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: false,
            page: 0,
            prevY: 0,
            hasMore: true,
            errMess: null,
            infoMess: null
        };
    }

    componentDidMount() {
        this.getUsers(this.state.page);

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.4
        };
        
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }

    getUsers(page) {
        

        if(this.props.searches.searchTerm == null || this.props.searches.searchTerm.length<1){
            this.setState({hasMore: true});
            this.setState({infoMess: "Type something in the searchbox to search"});
        }
        else {
            this.setState({ loading: true });
            const bearer = 'Bearer ' + localStorage.getItem('token');
            fetch(baseUrl+'search?searchTerm='+this.props.searches.searchTerm+'&page='+page,{
                headers: {
                    'Authorization': bearer
                },
            })
            .then(response => response.json())
            .then(searchResult => {
                this.setState({ users: [...this.state.users, ...searchResult] });
                console.log(searchResult);
                this.setState({ loading: false });
                if(searchResult.length < 6){
                    this.setState({hasMore: false});
                }
            })
        }
    }

     

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y && this.state.hasMore) {
            this.setState({ page: this.state.page+1 });
            this.getUsers(this.state.page);
            
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
                <div>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>AddUsers</BreadcrumbItem>
            </Breadcrumb>
            </div>
            <div>
                
                    {this.state.users.map(user => (
                        <RenderUser user={user} />
                    ))}
                </div>
                <div>
                    {!this.state.hasMore ?
                        <h4>Yay!! you have visited it all</h4>:
                        null
                    }
                    {/* {this.state.errMess ?
                        <h4>{this.state.errMess}</h4>:
                        null
                    } */}
                    {this.state.infoMess ?
                        <h4>{this.state.infoMess}</h4>:
                        null
                    }
                </div>
                    
                <div ref={loadingRef => (this.loadingRef = loadingRef)} style={loadingCSS} >
                    {
                        this.state.loading ?
                        <span style={loadingTextCSS}>Loading...</span>:
                        null
                    }   
                </div>
            </div>
        );
    }
}

export default AddUsers;