import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({item, isLoading, errMess}) {
    if (isLoading) {
        return(
            <Loading />
        );
    }
    else if (errMess) {
        return(
            <h4>{errMess}</h4>
        );
    }
    else
        return(
            <FadeTransform in 
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
}

class Home extends React.Component {
    

    constructor(props) {
        super(props);
        
    }
    shouldComponentUpdate(nextProps) {
        // Rendering the component only if 
        // passed props value is changed
        // console.log(this.props.value);
        // console.log(nextProps.value);
      
        if (nextProps.value !== this.props.value) {
          return true;
        } else {
          return false;
        }
      }
    
    render() {
        return(
            <div className="container">
                <div className="row align-items-start">
                    <div>Home</div>
                    {/* <div className="col-12 col-md m-1">
                        <RenderCard item={this.props.dish} 
                            isLoading={this.props.dishesLoading}
                            errMess={this.props.dishesErrMess} />
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard item={this.props.promotion} 
                            isLoading={this.props.promosLoading}
                            errMess={this.props.promosErrMess} />
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard item={this.props.leader} 
                            isLoading={this.props.leaderLoading} 
                            errMess={this.props.leaderErrMess} />
                    </div> */}
                </div>
            </div>
        );
    }
    
}


export default Home;