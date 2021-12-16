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
                    <CardTitle>{this.props.course.courseName}</CardTitle>
                    </CardBody>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>{this.props.course.author.username}</ListGroupItem>
                        {this.props.course.author.email?<ListGroupItem>{this.props.course.author.email}</ListGroupItem>:null}
                        <ListGroupItem>Created On : {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(this.props.course.createdAt)))}</ListGroupItem>
                        <ListGroupItem>updated On : {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(this.props.course.updatedAt)))}</ListGroupItem>
                    </ListGroup>
                </Card>
            </div>
        );

    }
}

export default CourseDetail;