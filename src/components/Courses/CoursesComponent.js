import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MyBoughtCourses from './CourseSubComponent/MyBoughtCourses';
import MyCreatedCourses from './CourseSubComponent/MyCreatedCourses';
import { Accordion, Button } from 'react-bootstrap';
import CreateCourseModal from './CourseCreateModal/CreateModalComponent';
// import { fetchCreatedCourse, postCreatedCourse } from '../../redux/Course/CreatedCourse/ActionCreator';
// import { fetchBoughtCourse, postBoughtCourse } from '../../redux/Course/BoughtCourse/ActionCreator';
// import { fetchCourseTags } from '../../redux/CourseTags/ActionCreator';

// const mapStateToProps = state => {
//     return {
//         courseTags: state.courseTags,
//         boughtCourse: state.boughtCourse,
//         createdCourse: state.createdCourse
//     }
//   }
  
// const mapDispatchToProps = (dispatch) => ({
//     fetchCourseTags: (courseData) => dispatch(fetchCourseTags(courseData)),
//     fetchBoughtCourse: () => dispatch(fetchBoughtCourse()),
//     postBoughtCourse: (courseData) => dispatch(postBoughtCourse(courseData)),
//     fetchCreatedCourse: () => dispatch(fetchCreatedCourse()),
//     postCreatedCourse: (courseData) => dispatch(postCreatedCourse(courseData)),

// });
  
  


class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreateModalOpen: false
        }
    }

    // componentDidMount() {
    //     this.props.fetchCourseTags();
    //     this.props.fetchCreatedCourse();
    // }

    toggleModalCreate = (event) => {
        // event.preventDefault();
        this.setState({
            isCreateModalOpen: !this.state.isCreateModalOpen
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Courses</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-4">
                            <h3>Courses</h3>
                            <hr />
                        </div>
                        <div className="col-8">
                            <Button onClick={this.toggleModalCreate} className="pull-right shadow-none">
                                <span className="fa fa-plus fa-lg"></span>  Create Course
                            </Button>
                        </div>
                        <div>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0" className="mb-3">
                                    <Accordion.Header>My Bought Courses</Accordion.Header>
                                    <Accordion.Body>
                                        <MyBoughtCourses />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>My Created Courses</Accordion.Header>
                                    <Accordion.Body>
                                        <MyCreatedCourses 
                                            createdCourse={this.props.createdCourse}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item> 
                            </Accordion>
                        </div>
                    </div>
                </div>
                {/* <CreateCourseModal isModalOpen={this.state.isCreateModalOpen} 
                    toggleModal={this.toggleModalCreate}
                    courseTags = {this.props.courseTags}
                    // postCreatedCourse={this.props.postCreatedCourse}
                /> */}
               
            </React.Fragment>
        );

    }
}

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Courses));


export default Courses;