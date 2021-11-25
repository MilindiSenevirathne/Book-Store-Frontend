import httpClient from '../http-common'

const getAll = () => {
    return httpClient.get('/books');
}

const create = (data) => {
    return httpClient.post('/books', data);
}

const get = id => {
    return httpClient.get(`/books/${id}`);
}

const update = (data) => {
    return httpClient.put('/books', data);
}


const remove = id => {
    return httpClient.delete(`/books/${id}`);
}

export default { getAll, create, get, update, remove };

