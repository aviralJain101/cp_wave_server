import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem, CardImg, CardText, CardTitle, CardBody, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


class CourseDetail extends Component {
    constructor(props) {
        super(props);
       }

    render() {

        return (
            <div>
                <h4>Course Details</h4>
                <Card className="col-12 col-md-6 col-lg-3">
                    <Link to='#' >
                    <CardImg variant="top" src="./assets/images/vadonut.png" />
                    </Link>
                    <CardBody>
                        <CardTitle>Card Title</CardTitle>
                        <CardText>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </CardText>
                    </CardBody>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Author</ListGroupItem>
                        <ListGroupItem>Created On</ListGroupItem>
                        <ListGroupItem>Rating</ListGroupItem>
                        <ListGroupItem>Students taken this course</ListGroupItem>
                    </ListGroup>
                </Card>
            </div>
        );

    }
}

export default CourseDetail;