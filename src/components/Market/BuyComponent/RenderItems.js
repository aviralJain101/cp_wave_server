import React from 'react';
import { Card, CardImg, CardImgOverlay,CardBody, CardText, CardTitle, CardSubtitle, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../shared/baseUrl';
import { Loading } from '../../LoadingComponent';
function RenderMarketItem({ item, buyItem }) {
    return(
        <Card>
            <Link to={`/market/${item._id}`} className="text-decoration-none">
                <CardImg width="100%" src={`${baseUrl}${item.image}`} alt={item.itemname} height="150px" />
                <CardBody className="text-center text-dark text-capitalize">
                    <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>{item.itemname}</CardTitle>
                    <CardSubtitle>Price : ${item.price/100}</CardSubtitle>
                    <CardText>Seller : {item.seller.name}</CardText>
                </CardBody>
            </Link>
            <Button className="w-100" onClick={() => buyItem({id:item._id})}>Buy</Button>
        </Card>
    );
}

const RenderItems = (props) => {

    const items = props.marketItem.items.map((item) => {
        return (
            <div key={item._id} className="col-12 col-sm-6 col-lg-4">
                <RenderMarketItem 
                    item={item} 
                    buyItem={props.buyItem}
                />
            </div>
        );
    });

    if (props.marketItem.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.marketItem.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.marketItem.errMess}</h4>
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