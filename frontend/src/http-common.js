import axios from 'axios';

export default axios.create({

    //declare local host port
    baseURL:"http://localhost:8080/api/v1",
    headers: {
        'Content-Type': 'application/json'
    }
})