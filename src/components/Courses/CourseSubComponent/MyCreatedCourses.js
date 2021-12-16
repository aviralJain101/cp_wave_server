import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem, CardImg, CardText, CardTitle, CardBody, Accordion,  } from 'reactstrap';
import { Link } from 'react-router-dom';

function formatDate(date) {
    const currentMonth = date.getMonth();
    const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
    const currentDate = date.getDate();
    const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
    return `${date.getFullYear()}-${monthString}-${currentDate}`;
}

function RenderCourseItem({ course }) {
    return(
        <Card className="">
            <Link to={`/courses/${course._id}`} >
                <CardImg variant="top" height="200px" src="./assets/images/buffet.png" />
            </Link>
            <CardBody>
                <CardTitle>{course.courseName}</CardTitle>
                {/* <CardText>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </CardText> */}
            </CardBody>
            <ListGroup className="list-group-flush">
                <ListGroupItem>{course.author.username}</ListGroupItem>
                {course.author.email?<ListGroupItem>{course.author.email}</ListGroupItem>:null}
                <ListGroupItem>Created On : {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(course.createdAt)))}</ListGroupItem>
                <ListGroupItem>updated On : {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(course.updatedAt)))}</ListGroupItem>

                {/* <ListGroupItem>Rating</ListGroupItem>
                <ListGroupItem>Students taken this course</ListGroupItem> */}
            </ListGroup>
            {/* <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body> */}
        </Card>
    );
}



class MyCreatedCourses extends Component {
    constructor(props) {
        super(props);
       }

    render() {
        const courses = this.props.createdCourse.course.map((course) => {
            return (
                <div key={course._id} className="col-12 col-md-6 col-lg-4 mb-2">
                    <RenderCourseItem course={course} />
                </div>
            );
        });

        return (
            <div className="row">
                {courses}
            </div>
        );

    }
}

export default MyCreatedCourses;