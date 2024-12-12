import axios from 'axios';

function fetchCategories() {
    return axios.get('http://127.0.0.1:3000/categories');
}

export default fetchCategories;