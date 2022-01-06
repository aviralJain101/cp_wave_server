import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEqual from 'lodash.isequal';
import { fetchCourseDetail, postTopic, editTopic } from '../../../../redux/Topics/ActionCreator';
import CourseDetail from './CourseDetailComponent';


const mapStateToProps = state => {
    return {
        topics: state.topics
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
    fetchCourseDetail: (courseId) => dispatch(fetchCourseDetail(courseId)),
    postTopic: (courseId, topic, history) => dispatch(postTopic(courseId, topic, history)),
    editTopic: (courseId, topicId, topic) => dispatch(editTopic(courseId, topicId, topic))
});

class CourseDetailRouter extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCourseDetail(this.props.courseId);
    }

    

    render() {

        const CourseWithIdPage = ({match}) => {
            // this.props.fetchTopics(match.params.itemId);
            return(
                <CourseDetail
                    item={this.props.sellItem.items.filter((item) => isEqual(item._id, match.params.itemId))[0]}
                    isLoading={this.props.sellItem.isLoading}
                    errMess={this.props.sellItem.errMess}
                    topics = {this.props.topics.topics}
                    fetchTopics ={this.props.fetchTopics}
                    courseId = {match.params.itemId}
                />
            );
        }

        // const CreateCoursePage = () => {
        //     return(
        //         <CreateCourse 
        //             postItem={this.props.postItem}
        //         />
        //     );
        // }

        // const EditCoursePage = ({match}) => {
        //     return(
        //         <EditCourse
        //             item={this.props.sellItem.items.filter((item) => isEqual(item._id, match.params.itemId))[0]}
        //             editCourse={this.props.editCourse}
        //             // courseId={match.params.itemId}
        //         />
        //     );
        // }

        // const CreateTopicPage = ({match}) => {
        //     return(
        //         <CreateTopics 
        //             postTopic = {this.props.postTopic}
        //             courseId = {match.params.itemId}
        //         />
        //     );
        // }


        return (
            <div>
                {console.log(this.props.match)}
                <Switch>
                    {/* <Route exact path={this.props.match.url+'/:itemId/createtopics'} component={CreateTopicPage} />
                    <Route path={this.props.match.url+'/:itemId/edit'} component={EditCoursePage} /> */}
                    <Route path={this.props.match.url+'/:itemId'} component={CourseWithIdPage} />

                </Switch>
          </div>
        );

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseDetailRouter));