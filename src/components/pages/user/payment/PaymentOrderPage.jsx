import React, {useEffect, useState} from 'react';
import NavigationBar from "../../../common/NavigationBar";
import {Button, Col, Container, Form, Jumbotron, Row} from "react-bootstrap";
import Footer from "../../../common/Footer";
import {Link, useHistory} from "react-router-dom";
import MailService from "../../../../service/MailService";
import PaymentService from "../../../../service/PaymentService";
import AlertCSSTransition from "../../../common/AlertCSSTransition";
import {getBasketById} from "../../../../redux/basket/BasketAction";
import {useDispatch, useSelector} from "react-redux";

function PaymentOrderPage(props) {
    const dispatch = useDispatch()
    const {basketFilmList, loadingBasket} = useSelector(state => state.dataBaskets)
    const history = useHistory('');

    const user = JSON.parse(localStorage.getItem("user"))
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [CVV, setCVV] = useState('');
    const [emailCode, setEmailCode] = useState('');

    // Errors
    const [cardNameError, setCardNameError] = useState('');
    const [cardNumberError, setCardNumberError] = useState('');
    const [expiryDateError, setExpiryDateError] = useState('');
    const [CVVError, setCVVError] = useState();
    const [emailCodeError, setEmailCodeError] = useState();

    const [sendingMail, setSendingMail] = useState(false)

    // Global errors
    const [showError, setShowError] = useState(false);
    const [textError, setTextError] = useState('')

    // Success
    const [showSuccess, setShowSuccess] = useState(false);
    const [textSuccess, setTextSuccess] = useState('')
    const [isPayment, setIsPayment] = useState(false)

    useEffect(() => {
        if (basketFilmList === null) {
            dispatch(getBasketById(user.id))
        } else if (!loadingBasket) {
            if (basketFilmList.length === 0) {
                history.push('/profile/cabinet')
            }
        }
    }, [loadingBasket])

    const changeCardNameHandler = (event) => {
        setCardName(event.target.value)
        setCardNameError("")
    }

    const changeCardNumberHandler = (event) => {
        setCardNumber(event.target.value)
        setCardNumberError("")
    }

    const changeExpiryDateHandler = (event) => {
        setExpiryDate(event.target.value)
        setExpiryDateError("")
    }

    const changeCVVHandler = (event) => {
        setCVV(event.target.value)
        setCVVError("")
    }

    const changeEmailCodeHandler = (event) => {
        setEmailCode(event.target.value)
        setEmailCodeError("")
    }

    const sendMail = () => {
        setSendingMail(true)
        let request = {
            email: user.email,
            typeMessage: "PAYMENT_ORDER",
        }
        MailService.send(request)
            .then((resp) => {
                console.log(resp.data)
                setSendingMail(false)
                setTextSuccess("Success to sending email code! Check your mail account.")
                setShowSuccess(true);
            })
            .catch(error => {
                console.log(error)
                setSendingMail(false)
                setTextError("Failed to sending email code!");
                setShowError(true);
            })
    }

    const payment = (event) => {
        event.preventDefault();

        if (emailCode.length === 0) {
            setEmailCodeError("email code can't be empty")
        } else {
            let request = {
                userId: user.id,
                emailCode: Number.parseInt(emailCode)
            }
            console.log(request)
            PaymentService.pay(request)
                .then((response) => {
                    setShowError(false)
                    setShowSuccess(true)
                    setTextSuccess("Payment is OK")
                    setIsPayment(true)
                    console.log(response)
                })
                .catch((error) => {
                    setShowError(true)
                    console.log(error)
                });
        }
    }

    const showForm = () => {
        if (isPayment) {
            return (
                <div>
                    <Link to={'/profile/purchases'}>
                        <h1 className={"my-link"}>Go to purchases list</h1>
                    </Link>
                </div>
            )
        } else {
            return (
                <Form style={{textAlign: "left"}}>
                    <Form.Group as={Col}>
                        <Form.Label><b>CARD HOLDER NAME</b></Form.Label>
                        <Form.Control type="text"
                                      className="my-input"
                                      autoComplete="off"
                                      value={cardName}
                                      onChange={changeCardNameHandler}
                                      isInvalid={cardNameError}
                                      placeholder="Enter card holder name"
                        />
                        <Form.Control.Feedback type='invalid'>{cardNameError}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label><b>CARD NUMBER</b></Form.Label>
                        <Form.Control type="email"
                                      className="my-input"
                                      autoComplete="off"
                                      value={cardNumber}
                                      onChange={changeCardNumberHandler}
                                      isInvalid={cardNumberError}
                                      placeholder="0000 0000 0000 0000"
                        />
                        <Form.Control.Feedback type='invalid'>{cardNumberError}</Form.Control.Feedback>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group as={Col}>
                                <Form.Label><b>EXPIRY DATE</b></Form.Label>
                                <Form.Control type="text"
                                              className="my-input"
                                              autoComplete="off"
                                              value={expiryDate}
                                              onChange={changeExpiryDateHandler}
                                              isInvalid={expiryDateError}
                                              placeholder="MM/YY"
                                />
                                <Form.Control.Feedback
                                    type='invalid'>{expiryDateError}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label><b>CVV</b></Form.Label>
                                <Form.Control type="text"
                                              className="my-input"
                                              autoComplete="off"
                                              value={CVV}
                                              onChange={changeCVVHandler}
                                              isInvalid={CVVError}
                                              placeholder="000"
                                />
                                <Form.Control.Feedback
                                    type='invalid'>{CVVError}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <Row>
                                <Col sm={8}>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label><b>EMAIL CODE</b></Form.Label>
                                        <Form.Control type="text"
                                                      className="my-input"
                                                      autoComplete="off"
                                                      value={emailCode}
                                                      onChange={changeEmailCodeHandler}
                                                      isInvalid={emailCodeError}
                                                      placeholder="0000"
                                        />
                                        <Form.Control.Feedback
                                            type='invalid'>{emailCodeError}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <div style={{paddingTop: "22%"}}>
                                        <Button variant="outline-primary"
                                                disabled={sendingMail}
                                                onClick={!sendingMail ? sendMail : null}>
                                            <b>{sendingMail ? 'loading...' : 'Send code'}</b>
                                        </Button>{' '}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div style={{textAlign: "right", paddingRight: "1.5%"}}>
                        <Link to="/profile/basket" className="my-link">
                            <Button variant="outline-danger"><b>Back to basket</b></Button>{' '}
                        </Link>
                        <Button variant="outline-success" onClick={payment}>
                            <b>payment order</b>
                        </Button>
                    </div>
                </Form>
            )
        }
    }

    return (
        <div>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} style={{marginTop: "20px"}}>
                        <Jumbotron className="bg-dark text-white" style={{paddingTop: "3%", paddingBottom: "5%"}}>
                            <Container>
                                <h2><b>PAYMENT ORDER</b></h2>
                                <hr/>
                                <div style={{textAlign: "left"}}>
                                    <AlertCSSTransition in={showError}
                                                        variant="danger"
                                                        textHeader="Oh snap! You got an error!"
                                                        text={textError}
                                                        close={() => setShowError(false)}
                                    />
                                    <AlertCSSTransition in={showSuccess}
                                                        variant="success"
                                                        textHeader="It's OK!"
                                                        text={textSuccess}
                                                        close={() => setShowSuccess(false)}
                                    />
                                </div>
                                {showForm()}
                            </Container>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    );
}

export default PaymentOrderPage;
