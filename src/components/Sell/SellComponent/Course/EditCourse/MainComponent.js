import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import Select from 'react-select';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { fetchSingleCourse } from '../../../../../redux/SingleCourseFetch/ActionCreator';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';




const options = [
    { value: 'CP', label: 'CP' },
    { value: 'WEB DEV', label: 'WEB DEV' },
    { value: 'ML', label: 'ML' },
    { value: 'DL', label: 'DL' }
];

const mapStateToProps = state => {
    return {
        singleCourse: state.singleCourse
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
    fetchSingleCourse: (courseId) => dispatch(fetchSingleCourse(courseId))
});



class EditCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            selectedFile: null,
            editorState: EditorState.createEmpty(),
            itemname:'',
            price: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchSingleCourse(this.props.courseId)
        if(!this.props.singleCourse.isLoading && this.props.singleCourse.course.length!= 0) {
            var tags = this.props.singleCourse.course.category.map((tag) => {
                return ({
                    value: tag,
                    label: tag
                })
            })

            const data = EditorState.createWithContent(
                convertFromRaw(JSON.parse(this.props.singleCourse.course.description))
            );

            
            this.setState ({ 
                itemname: this.props.singleCourse.course.title,
                price: this.props.singleCourse.course.price,
                selectedOption: tags,
                editorState: data
    
            })
        }
    }
    

    handleSubmit(event) {
        event.preventDefault();
        // const rawState = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
        // var tags = this.state.selectedOption.map((option) => {
        //     var tag = option.value;
        //     return tag;
        // });

        // const item = new FormData();
        // item.append("title", this.itemname.value);
        // item.append("price", this.price.value);
        // item.append("category", tags);
        // item.append("courseImage", this.state.selectedFile);
        // item.append("description", rawState);
        // console.log(item)
    }

    // handleChange = (selectedOption) => {
    //     this.setState({ selectedOption });
    //     console.log(`Option selected:`, selectedOption);
    // };

    // // On file select (from the pop up)
	// onFileChange = event => {
    //     // Update the state
    //     this.setState({ selectedFile: event.target.files[0] });
	// };

    // onEditorStateChange = (editorState) => {
    //     // console.log(this.state.editorState.getCurrentContent().getPlainText());
    //     this.setState({
    //       editorState: editorState
    //     });
    // };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }



    render() {
        const { selectedOption } = this.state;
        const { editorState } = this.state;
        // this.setState({
        //     itemname: "fuckyou"
        // })
        return(
            <React.Fragment>
                <div className="container">
                    <div className="row">
                    <div className="mt-4">
                        <h4>Edit Course</h4>
                        <hr />
                    </div>
                    
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="itemname">Course Name</Label>
                                <Input type="text" id="itemname" name="itemname"
                                    value={this.state.itemname}
                                    onChange={this.handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="price">Price</Label>
                                <Input type="text" id="price" name="price"
                                    value={this.state.price}
                                    onChange={this.handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup className="mt-3 mb-4">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={options}
                                    isMulti='true'
                                    isSearchable='true'
                                    placeholder='Select Category'
                                />
                            </FormGroup>
                            <FormGroup className="mb-4">
                                <Label for="itemImage">Image</Label>
                                <Input type="file" id="itemImage" name="itemImage"
                                    onChange={this.onFileChange} 
                                />
                            </FormGroup>
                            <FormGroup style = {{minHeight: "400px"}}>
                                <Editor
                                    wrapperClassName="wrapper-class"
                                    editorClassName="editor-class"
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                    placeholder="Course Description"
                                />
                            </FormGroup>
                            
                            <FormGroup className="text-center mt-2 mb-3">
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditCourse));

// export default EditCourse;