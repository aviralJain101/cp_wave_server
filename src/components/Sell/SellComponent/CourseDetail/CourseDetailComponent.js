import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardSubtitle, CardText, CardBody, CardTitle, 
    Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../../shared/baseUrl';
import { Loading } from '../../../LoadingComponent';
// import { FadeTransform } from 'react-animation-components';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';

function RenderItem({item, description, data, currentContentAsHTML}) {
        return(
            <React.Fragment>
                <div className="col-12 col-md-6">
                {/* <FadeTransform in 
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}> */}
                    <Card>
                        <CardImg width="100%" src={`${baseUrl}${item.image}`} alt={item.title} height="150px" />
                        <CardBody className="text-center text-dark text-capitalize">
                            <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>{item.title}</CardTitle>
                            <CardSubtitle>Price : ${item.price/100}</CardSubtitle>
                        </CardBody>
                    </Card>
                {/* </FadeTransform> */}
                </div>
                <div className="col-12 col-md-6">
                            {/* // const data = EditorState.createWithContent(
                    //     convertFromRaw(JSON.parse(item.description)).getCurrentContent().getPlainText()
                    // );
                    // console.log(data.getCurrentContent().getPlainText());

                    // console.log(this.state.editorState); */}

                    <Card>
                        <CardBody className="text-center text-dark text-capitalize">
                            <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>Course Description</CardTitle>
                            <CardSubtitle>
                                
                                {currentContentAsHTML}
                                
                            </CardSubtitle>
                        </CardBody>
                    </Card>
                </div>
            </React.Fragment>
            
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
    {
        const data = EditorState.createWithContent(convertFromRaw(JSON.parse(props.item.description)));
        let currentContentAsHTML = convertToHTML(data.getCurrentContent());

        const description = data.getCurrentContent().getPlainText();
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/sell'>Sell</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.item.title}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-4">
                        <h5>{props.item.title} 
                            <Link to={`${props.item._id}/edit`} className="pull-right shadow-none">
                                <i className="fa fa-edit fa-lg">
                                </i>
                            </Link>
                        </h5>
                        <hr />
                    </div>
                    <div className="col-8">
                        <Link to="/sell/createtopics" className="pull-right shadow-none">
                            <span className="fa fa-plus fa-lg"></span>  Create New Topic
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <RenderItem item={props.item}
                        description = {description}
                        data = {data}
                        currentContentAsHTML = {currentContentAsHTML}
                    />
                </div>
                <div className="row">
                    {/* render topics */}
                </div>

            </div>
        );
    }
    else
        return(
            <div></div>
        );
}

export default ItemDetail;