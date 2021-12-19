import React from 'react';
import { Card, CardImg, CardImgOverlay,CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../shared/baseUrl';
import { Loading } from '../../LoadingComponent';
function RenderMarketItem({ item, onClick }) {
    return(
        <Card>
            <Link to={`/market/${item._id}`} >
                <p>{item.itemname}</p>
                <Card>
                    <CardImg width="100%" src={`${baseUrl}${item.image}`} alt={item.itemname} />
                    <CardBody>
                        <CardTitle>{item.itemname}</CardTitle>
                    </CardBody>
                </Card>
            </Link>
        </Card>
    );
}

const RenderItems = (props) => {

    const items = props.marketItem.items.map((item) => {
        return (
            <div key={item._id} className="col-12 col-md-6 col-lg-4">
                <RenderMarketItem item={item} />
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