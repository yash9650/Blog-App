import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

const axios = require("axios");

export default class MyBlog extends React.Component {
  state = {
    blogs: [],
  };

  componentDidMount() {
    axios
      .get("http://localhost:3000/blogs")
      .then((resp) => {
        const blogs = resp.data;
        this.setState({ blogs });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteBlog(id) {
    console.log(id);
    axios
      .delete(`http://localhost:3000/blogs/${id}/`)
      .then((resp) => {
        alert("Blog Deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="blog-container">
        {this.state.blogs.map((ele) => {
          return (
            <Card body color="light" className="text-center blog-item">
              <CardBody>
                <div className="blog-title">
                  <CardTitle tag="h5" className="blog-title-text">
                    {ele.title}
                  </CardTitle>
                </div>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {ele.date}
                </CardSubtitle>
                <CardText className="blog-content">{ele.content}</CardText>
                <div className="button-container">
                  <div className="multiple-buttons">
                    <Link to="/view/1" state={{ element: { ele } }}>
                      <Button color="dark">View</Button>
                    </Link>
                    <Button color="success">Edit</Button>
                    <Button
                      color="danger"
                      onClick={() => this.deleteBlog(ele.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    );
  }
}
