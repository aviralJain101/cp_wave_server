import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem, CardImg, CardText, CardTitle, CardBody, Accordion,  } from 'reactstrap';
import { Link } from 'react-router-dom';


class MyCreatedCourses extends Component {
    constructor(props) {
        super(props);
       }

    render() {

        return (
            <div>
                <Card className="col-12 col-md-6 col-lg-3">
                <Link to='{`/courses/${course._id}`}' >
                    <CardImg variant="top" src="./assets/images/buffet.png" />
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
                    {/* <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body> */}
                </Card>
            </div>
        );

    }
}

export default MyCreatedCourses;