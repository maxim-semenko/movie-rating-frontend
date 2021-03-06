import React from 'react'
import {Button, Col, Container, Jumbotron, Row} from "react-bootstrap"
import {AiFillMessage, ImUsers, MdLocalMovies} from "react-icons/all"
import {AiOutlineGlobal} from "react-icons/ai"
import {Link} from "react-router-dom"
import NavigationBar from "../../common/NavigationBar"
import Footer from "../../common/Footer"

function AdminPage() {
    return (
        <div>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} style={{marginTop: "20px", padding: "20px 20px 20px 20px", textAlign: "left"}}>
                        <Link to="/profile/cabinet">
                            <Button variant="outline-danger"
                                    style={{marginBottom: "20px"}}>
                                <b>Back to profile</b>
                            </Button>
                        </Link>
                        <Jumbotron className="bg-dark text-white" style={{padding: "35px 20px 35px 25px"}}>
                            <Link to="all-users" className="my-link">
                                <h5>
                                    <span className="menu-icon"><ImUsers size={24}/></span>USERS CONTROL
                                </h5>
                            </Link>
                            <hr/>
                            <br/>
                            <Link to="all-films" className="my-link">
                                <h5>
                                    <span className="menu-icon"><MdLocalMovies size={24}/></span>FILMS CONTROL
                                </h5>
                            </Link>
                            <hr/>
                            <br/>
                            <Link to="all-genres" className="my-link">
                                <h5>
                                    <span className="menu-icon"><MdLocalMovies size={24}/></span>GENRES CONTROL
                                </h5>
                            </Link>
                            <hr/>
                            <br/>
                            <Link to="all-countries" className="my-link">
                                <h5>
                                    <span className="menu-icon"><AiOutlineGlobal size={24}/></span>COUNTRIES CONTROL
                                </h5>
                            </Link>
                            <hr/>
                            <br/>
                            <Link to="messages" className="my-link">
                                <h5>
                                    <span className="menu-icon"><AiFillMessage size={24}/></span>MESSAGES CONTROL
                                </h5>
                            </Link>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    );
}

export default AdminPage
