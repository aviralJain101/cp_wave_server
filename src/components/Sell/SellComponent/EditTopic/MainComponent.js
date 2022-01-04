import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import Select from 'react-select';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { convertToRaw } from 'draft-js';
// import { convertFromRaw } from 'draft-js';

const options = [
    { value: 'CP', label: 'CP' },
    { value: 'WEB DEV', label: 'WEB DEV' },
    { value: 'ML', label: 'ML' },
    { value: 'DL', label: 'DL' }
  ];
class CreateTopics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            selectedFile: null,
            editorState: EditorState.createEmpty(),
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        // console.log(this.state);
        // console.log(this.state.editorState.getCurrentContent());

        // console.log(this.state.editorState.getCurrentContent().getPlainText());
        const rawState = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
        // console.log(rawState);

        // const data = EditorState.createWithContent(
        //     convertFromRaw(JSON.parse(rawState))
        // );
        // console.log(data);
        // console.log(data.getCurrentContent().getPlainText());

        // console.log(this.state.editorState);
        var tags = this.state.selectedOption.map((option) => {
            var tag = option.value;
            return tag;
        });


        console.log(this.state.editorState);


        const item = new FormData();
        item.append("title", this.topicname.value);
        item.append("price", this.price.value);
        item.append("category", tags);
        item.append("courseImage", this.state.selectedFile);
        item.append("description", rawState);


        // axios.post(`${baseUrl}imageUpload`, item);
        console.log(item)
        this.props.postItem(item);
        //  to do
        // push history to created course
        // 

        
        
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    // On file select (from the pop up)
	onFileChange = event => {
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
	};

    onEditorStateChange = (editorState) => {
        // console.log(this.state.editorState.getCurrentContent().getPlainText());
        this.setState({
          editorState: editorState
        });
    };



    render() {
        const { selectedOption } = this.state;
        const { editorState } = this.state;

        return(
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup className="mb-3">
                                <Label htmlFor="topicname">Topic Name</Label>
                                <Input type="text" id="topicname" name="topicname"
                                    innerRef={(input) => this.topicname = input} 
                                    // required
                                />
                            </FormGroup>
                            <FormGroup style = {{minHeight: "400px"}}>
                                <Editor
                                    wrapperClassName="wrapper-class"
                                    editorClassName="editor-class"
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                    placeholder="Topic Details"
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

export default CreateTopics;