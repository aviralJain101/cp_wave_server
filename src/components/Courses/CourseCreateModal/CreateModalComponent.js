import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody,Form, FormGroup, Input, Label } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem,CardBody, CardHeader } from 'reactstrap';
import Multiselect from 'multiselect-react-dropdown';
import Select from 'react-select';


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  

class CreateCourseModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // tags:[],
            selectedOption: null,
        }
        this.handleCreate = this.handleCreate.bind(this);
        // this.onSelect = this.onSelect.bind(this);
        // this.onRemove = this.onRemove.bind(this);
    }


    // onSelect(selectedList, selectedItem) {
    //     this.setState({tags: selectedList});
    //     console.log(this.state.tags);
    // }

    // onRemove(selectedList, removedItem) {
    //     this.setState({tags: selectedList});
    //     console.log(this.state.tags);
    // }

    handleCreate(event) {
        this.props.toggleModal();
        console.log(this.coursename.value);
        console.log(this.state.selectedOption);
        // this.props.createCourse({username: this.username.value, password: this.password.value});
        event.preventDefault();
    }

    // state = {
    //     selectedOption: null,
    // };

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };


    render() {
        const { selectedOption } = this.state;
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
                                {/* <Multiselect
                                    options={this.state.options} // Options to display in the dropdown
                                    onSelect={this.onSelect} // Function will trigger on select event
                                    onRemove={this.onRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                    showCheckbox='true'
                                    closeOnSelect={true}
                                    id="course tags"
                                    avoidHighlightFirstOption= 'true'
                                    placeholder={"Select Course Tags"}
                                /> */}
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