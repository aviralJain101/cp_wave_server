import React from 'react';
import { Card, CardImg, CardImgOverlay,CardBody, CardSubtitle, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../shared/baseUrl';
import { Loading } from '../../LoadingComponent';
function RenderSellItem({ item }) {
    return(
        <Card>
            <Link to={`/sell/${item._id}`} className="text-decoration-none">
                    <Card>
                        <CardImg width="100%" src={`${baseUrl}${item.image}`} alt={item.itemname} height="150px" />
                        <CardBody className="text-center text-dark text-capitalize">
                            <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>{item.itemname}</CardTitle>
                            <CardSubtitle>Price : ${item.price/100}</CardSubtitle>
                        </CardBody>
                    </Card>
                
            </Link>
        </Card>
    );
}

const RenderItems = (props) => {

    const items = props.sellItem.items.map((item) => {
        return (
            <div key={item._id} className="col-12 col-md-6 col-lg-4">
                <RenderSellItem item={item} />
            </div>
        );
    });

    if (props.sellItem.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.sellItem.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.sellItem.errMess}</h4>
                </div>
            </div>
        );
    }
    else
        return (
            <div className="container">
                <div className="row mt-4 mb-4">
                    {items}
                </div>
            </div>
        );
}

export default RenderItems;