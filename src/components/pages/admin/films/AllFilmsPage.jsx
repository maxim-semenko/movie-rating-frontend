import React, {useEffect, useState} from 'react'
import {Button, Col, Container, Form, Jumbotron, Row, Table} from "react-bootstrap"
import NavigationBar from "../../../NavigationBar"
import Footer from "../../../Footer"
import FilmService from "../../../../service/FilmService"
import CreateUpdateFilmModal from "./CreateUpdateFilmModal";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getFilmById, getFilms, setCurrentPage, setSizePage} from "../../../../redux/film/FilmAction";
import Pagination from "react-js-pagination";

function AllFilmsPage() {
    const history = useHistory('');
    const search = window.location.search;
    const params = new URLSearchParams(search);

    const dispatch = useDispatch()
    const {films, loading, currentPage, sizePage, totalPages, totalElements} = useSelector(state => state.dataFilms)

    const [showAddEditFilmModal, setShowAddEditFilmModal] = useState(false)
    const [method, setMethod] = useState("")

    useEffect(() => {
            dispatch(getFilms(currentPage, sizePage))
        }, [currentPage, dispatch, sizePage, totalElements]
    )

    const removeFilm = (id) => {
        FilmService.deleteById(id).then(response => {
            console.log(response)
            getFilms()
        }).catch(error => {
                console.log(error)
            }
        )
    }

    const createFilm = () => {
        setShowAddEditFilmModal(true);
        setMethod("create")
    }

    /**
     * Method that load needed ашдь by id and open CreateUpdateFilmModal with method update.
     * @param {number} id  - Student id
     */
    const editFilm = (id) => {
        dispatch(getFilmById(id))
        setShowAddEditFilmModal(true);
        setMethod("update")
    }

    return (
        <div>
            {
                showAddEditFilmModal ?
                    <CreateUpdateFilmModal
                        show={showAddEditFilmModal}
                        onHide={() => setShowAddEditFilmModal(false)}
                        method={method}
                        updateList={getFilms}
                    />
                    :
                    null
            }

            <NavigationBar/>
            <Container fluid>
                <Col lg={12} style={{marginTop: "20px"}}>
                    <Jumbotron className="bg-dark text-white">
                        <Button href="/profile/admin/controllers" variant="outline-danger"
                                style={{marginBottom: "20px"}}>
                            <b>Back to controllers</b>
                        </Button>{' '}
                        <Button variant="outline-primary"
                                style={{marginBottom: "20px"}} onClick={() => createFilm()}>
                            <b>Create a new film</b>
                        </Button>
                        <Row>
                            <div style={{margin: "0"}}>
                                <Form style={{textAlign: "left"}}>
                                    <Form.Group className="mb-4">
                                        <Form.Label> Size of elements:</Form.Label>
                                        <Form.Control as={"input"} type={"number"}
                                                      placeholder={"Count of elements of page"}
                                                      value={sizePage}
                                                      onChange={event => {
                                                          dispatch(setSizePage(event.target.value));
                                                          dispatch(setCurrentPage(1))
                                                      }
                                                      }
                                                      min={"1"}
                                                      max={totalElements} style={{width: "120px"}}>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Pagination itemClass="page-item"
                                                    linkClass="page-link"
                                                    activePage={currentPage}
                                                    itemsCountPerPage={sizePage}
                                                    totalItemsCount={totalElements}
                                                    pageRangeDisplayed={5}
                                                    onChange={(pageNumber) => dispatch(setCurrentPage(pageNumber))}
                                        />
                                    </Form.Group>
                                </Form>
                            </div>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Rating</th>
                                    <th>Price($)</th>
                                    <th>Genre</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    films.map(film =>
                                        <tr key={film.id}>
                                            <td><b>{film.name}</b></td>
                                            <td><b>{film.rating}</b></td>
                                            <td><b>{film.price}$</b></td>
                                            <td><b>{film.genre.name}</b></td>
                                            <td>
                                                <Button variant="outline-success"
                                                        onClick={() => editFilm(film.id)}>
                                                    <b>Edit</b>
                                                </Button>{' '}
                                                <Button variant="outline-danger"
                                                        onClick={() => removeFilm(film.id)}>
                                                    <b>Remove</b>
                                                </Button>{' '}
                                                <Button variant="outline-warning">
                                                    <b>More info</b>
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </Table>
                        </Row>
                    </Jumbotron>
                </Col>
            </Container>
            <Footer/>
        </div>
    );
}

export default AllFilmsPage;