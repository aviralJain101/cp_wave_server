import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardSubtitle, CardText, CardBody, CardTitle, 
    Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../../shared/baseUrl';
import { Loading } from '../../../LoadingComponent';
// import { FadeTransform } from 'react-animation-components';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSingleCourse } from '../../../../redux/SingleCourseFetch/ActionCreator';

const mapStateToProps = state => {
  return {
    singleCourse: state.singleCourse
  }
}

const mapDispatchToProps = (dispatch) => ({
    fetchSingleCourse: (courseId) => dispatch(fetchSingleCourse(courseId))
});



function RenderItem({item, description, data, currentContentAsHTML}) {
        return(
            <React.Fragment>
                <div className="col-12 col-md-6">
                {/* <FadeTransform in 
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}> */}
                    <Card>
                        <CardImg width="100%" src={`${baseUrl}${item.image}`} alt={item.title} height="150px" />
                        <CardBody className="text-center text-dark text-capitalize">
                            <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>{item.title}</CardTitle>
                            <CardSubtitle>Price : ${item.price/100}</CardSubtitle>
                        </CardBody>
                    </Card>
                {/* </FadeTransform> */}
                </div>
                <div className="col-12 col-md-6">
                            {/* // const data = EditorState.createWithContent(
                    //     convertFromRaw(JSON.parse(item.description)).getCurrentContent().getPlainText()
                    // );
                    // console.log(data.getCurrentContent().getPlainText());

                    // console.log(this.state.editorState); */}

                    <Card>
                        <CardBody className="text-center text-dark text-capitalize">
                            <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>Course Description</CardTitle>
                            <CardSubtitle>
                                
                                {currentContentAsHTML}
                                
                            </CardSubtitle>
                        </CardBody>
                    </Card>
                </div>
            </React.Fragment>
            
        );

}

class ItemDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {            
        };
    }

    componentDidMount() {
        this.props.fetchSingleCourse(this.props.courseId);
    }

    render() {
        // return (
        //     <div>
        //         <h4>Course Detail</h4>
        //     </div>
        // )
        
        
        if (this.props.singleCourse.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }

        else if (this.props.singleCourse.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.singleCourse.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (this.props.singleCourse.course.length != 0)   
        {
            const data = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.singleCourse.course.description)));
            let currentContentAsHTML = convertToHTML(data.getCurrentContent());

            const description = data.getCurrentContent().getPlainText();

            const topics = this.props.singleCourse.course.topics.map((topic) => {
                return <li>{topic.title}</li>
            })

            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to='/sell'>Sell</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.singleCourse.course.title}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-4">
                            <h5>{this.props.singleCourse.course.title} 
                                <Link to={`${this.props.singleCourse.course._id}/edit`} className="pull-right shadow-none">
                                    <i className="fa fa-edit fa-lg">
                                    </i>
                                </Link>
                            </h5>
                            <hr />
                        </div>
                        <div className="col-8">
                            <Link to={`/sell/${this.props.singleCourse.course._id}/createtopics`} className="pull-right shadow-none">
                                <span className="fa fa-plus fa-lg"></span>  Create New Topic
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <RenderItem item={this.props.singleCourse.course}
                            description = {description}
                            data = {data}
                            currentContentAsHTML = {currentContentAsHTML}
                        />
                    </div>
                    <div className="row mt-4 mb-4">
                        <h4 className="text-center">Topics</h4>
                        <hr/>
                        <ul>
                            {topics}
                        </ul>
                    </div>

                </div>
            );
        }
        else
            return(
                <div></div>
            );
        // else {
        //     return (
        //         <div>
                    
        //             <h4>Course Detail</h4>
        //             {console.log("checking")}
        //             {console.log(typeof this.props.singleCourse.course)}
        //             {console.log(this.props.singleCourse.course)}
        //             {console.log(this.props.singleCourse.course.length)}


        //         </div>
        //     )
        // }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemDetail));