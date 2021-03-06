import axios from "axios"
import {Cookies} from "react-cookie"

const PAYMENT_API_BASE_URL = "/api/v1/payment"
const cookies = new Cookies()

class PaymentService {

    async pay(request) {
        return axios.post(PAYMENT_API_BASE_URL, request, {
            headers: {'Authorization': `Bearer_${cookies.get("jwt")}`},
        })
    }

}

export default new PaymentService()
