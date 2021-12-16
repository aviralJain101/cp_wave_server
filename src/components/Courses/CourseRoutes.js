import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCreatedCourse, postCreatedCourse } from '../../redux/Course/CreatedCourse/ActionCreator';
import { fetchBoughtCourse, postBoughtCourse } from '../../redux/Course/BoughtCourse/ActionCreator';
import { fetchCourseTags } from '../../redux/CourseTags/ActionCreator';
import Courses from './CoursesComponent';
import CourseDetail from './CourseDetails/CourseDetailComponent';
import isEqual from 'lodash.isequal';

const mapStateToProps = state => {
    return {
        courseTags: state.courseTags,
        boughtCourse: state.boughtCourse,
        createdCourse: state.createdCourse
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
    fetchCourseTags: (courseData) => dispatch(fetchCourseTags(courseData)),
    fetchBoughtCourse: () => dispatch(fetchBoughtCourse()),
    postBoughtCourse: (courseData) => dispatch(postBoughtCourse(courseData)),
    fetchCreatedCourse: () => dispatch(fetchCreatedCourse()),
    postCreatedCourse: (courseData) => dispatch(postCreatedCourse(courseData)),

});
  
  


class CourseRouter extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCourseTags();
        this.props.fetchCreatedCourse();
    }

    

    render() {

        const CoursePage = ({}) => {
            return(
              <Courses
                courseTags = {this.props.courseTags}
                createdCourse={this.props.createdCourse}
                fetchCreatedCourse={this.props.fetchCreatedCourse}
                postCreatedCourse={this.props.postCreatedCourse}
              />
              );
        }
        const CourseWithId = ({match}) => {
            return(
                <CourseDetail
                    course={this.props.createdCourse.course.filter((course) => isEqual(course._id, match.params.courseId))[0]}
                    isLoading={this.props.createdCourse.isLoading}
                    errMess={this.props.createdCourse.errMess}
                />
            );
        }


        return (
            <div>
                {/* {console.log(this.props.match)} */}
                <Switch>
                    <Route exact path={this.props.match.url} component={CoursePage} />
                    <Route path={this.props.match.url+'/:courseId'} component={CourseWithId} />
                </Switch>
          </div>
        );

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseRouter));


// export default Courses;