import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody,Form, FormGroup, Input, Label } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem,CardBody, CardHeader } from 'reactstrap';
import Select from 'react-select';


// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
//   ];

// function createOption(props) {
//     // if(props != null || props.length !=0 )
//     // {
//     //     options = props.map((option) => { option['value']=option['tagName'];
//     //     delete option['tagName'];
//     //     })
//     // }

// }

class CreateCourseModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // tags:[],
            selectedOption: null,
        }
        this.handleCreate = this.handleCreate.bind(this);
    }


    handleCreate(event) {
        this.props.toggleModal();
        // console.log(this.coursename.value);
        // console.log(this.state.selectedOption);
        var tags = this.state.selectedOption.map((option) => {
            var tag = {"tagName": option.value};
            return tag;
        });
        // console.log("tags");
        console.log(tags);
        // this.props.postCreatedCourse({courseName: this.coursename.value, price: this.price.value, tags: this.state.selectedOption});
        event.preventDefault();
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };


    render() {
        const { selectedOption } = this.state;
        var options = this.props.courseTags.courseTags.map((tag) => {
            var t={"value" : tag.tagName,"label" : tag.label}
            return t;
        });

        return(

            <React.Fragment>
                <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal} centered>
                    <ModalHeader toggle={this.props.toggleModal}>Create Course</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleCreate}>

                            <FormGroup>
                                <Label htmlFor="coursename">Course Name</Label>
                                <Input type="text" id="coursename" name="coursename"
                                    innerRef={(input) => this.coursename = input} 
                                    required/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="price">Price</Label>
                                <Input type="text" id="price" name="price"
                                    innerRef={(input) => this.price = input} 
                                    required/>
                            </FormGroup>
                            <FormGroup className="mt-3 mb-4">
                                <Label htmlFor="price">Course Tags</Label>
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={options}
                                    isMulti='true'
                                    isSearchable='true'
                                    placeholder='Select Course Tag'
                                />
                            </FormGroup>
                            <FormGroup className="text-center mt-2 mb-3">
                                <Button type="submit" value="submit" color="primary">Create</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default CreateCourseModal;