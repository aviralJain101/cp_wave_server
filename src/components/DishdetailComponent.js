import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, 
    Breadcrumb,
    BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderComments({comments}) {

    if(comments != null) {
        const commentlist = comments.map((comment) => {
            return (
                <li>
                    <p>{comment.comment}</p>
                    <p> --{comment.author}
                        &nbsp;,&nbsp;{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                    </p>
                </li>
            );
        });

        return (
            <ul className="list-unstyled">
                {commentlist}
            </ul>
        );
    }
    else {
        return (
            <div>NULL</div>
        );
    }
}

function RenderDish(dish) {
    return (    
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle><b>{dish.name}</b></CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

const DishDetail = (props) => {
    if(props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        {RenderDish(props.dish)}
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                        <div>
                            <h4>Comments</h4>
                        </div>
                        <div>
                            <RenderComments comments={props.comments} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;