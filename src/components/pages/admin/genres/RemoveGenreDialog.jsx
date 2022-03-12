import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Modal} from "react-bootstrap";
import {deleteGenreById} from "../../../../redux/genre/GenreAction";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function RemoveGenreDialog(props) {
    const dispatch = useDispatch()
    const {genre, loading} = useSelector(state => state.dataGenres)

    const handleSubmit = () => {
        dispatch(deleteGenreById(genre.id))
            .then(() => {
                notifySuccess("The genre was deleted successfully!")
                props.onHide()
            })
            .catch((error) => {
                notifyError(error.response.data.message)
            })
    }

    const notifySuccess = (text) => toast.success(text, {
        autoClose: 2000,
        position: "top-right",
    });

    const notifyError = (text) => toast.error(text, {
        autoClose: 2000,
        position: "top-right",
    });

    const showContent = () => {
        if (loading) {
            return (
                <div>
                    loading...
                </div>
            )
        } else {
            return (
                <div style={{color: "white"}}>
                    <b>
                        <h4>
                            <p>Are you really want to remove this genre?!</p>
                            <p>Name: <span style={{textTransform: "uppercase"}}>{genre.name}</span></p>
                        </h4>
                    </b>
                </div>
            )
        }
    }

    toast.configure()
    return (
        <div>
            <Modal{...props} size="lg"
                  dialogClassName="modal-90w public-profile-modal-class"
                  aria-labelledby="example-custom-modal-styling-title"
                  className="special_modal">
                <Modal.Header closeButton>
                    <Modal.Title style={{color: "#9a9da0"}}><b>Remove genre</b></Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-dark">
                    {showContent()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={() => props.onHide()}>Close</Button>
                    <Button variant={"outline-danger"}
                            type="submit"
                            onClick={handleSubmit}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default RemoveGenreDialog;