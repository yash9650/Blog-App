import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";


const axios = require("axios");
export default class CreationForm extends React.Component {
  state = {
    title: "",
    content: "",
    date: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    function date() {
      var months = [
        "January",
        "Febuaury",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      var today = new Date();
      var currMonth = months[today.getMonth()];
      var date = today.getDate() + " " + currMonth + " " + today.getFullYear();
      return date;
    }
    var getcurrDate = date();
    this.state.date = getcurrDate;
    axios.post(`http://localhost:3000/blogs`, this.state).then((res) => {
      alert("Data added Successfully");
    });
  };

  render() {
    return (
      <div className="form-container">
        <h2 id="heading">Add a Blog</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter Blog Title"
              type="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="content">Content</label>
            <Input
              id="content"
              name="content"
              type="textarea"
              placeholder="Enter Your Content"
              value={this.state.content}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}
