import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardSubtitle, CardText, CardBody, CardTitle, 
    Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../shared/baseUrl';
import { Loading } from '../../LoadingComponent';
import { FadeTransform } from 'react-animation-components';

function RenderItem({item}) {
        return(
            <div className="col-12 col-md-5 m-1">
                <FadeTransform in 
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg width="100%" src={`${baseUrl}${item.image}`} alt={item.itemname} height="150px" />
                        <CardBody className="text-center text-dark text-capitalize">
                            <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>{item.itemname}</CardTitle>
                            <CardSubtitle>Price : ${item.price/100}</CardSubtitle>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        );

}

const ItemDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.item != null)        
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/sell'>Sell</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.item.itemname}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.item.itemname}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderItem item={props.item}/>
                </div>
            </div>
        );
    else
        return(
            <div></div>
        );
}

export default ItemDetail;