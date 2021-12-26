const axios = require('axios');

const getGroups = async () => {
    const groups = await axios.get('/users/getGroups')
    return groups.data
}

const getUsers = async () => {
    const users = await axios.get('/users/getUsers')
    return users.data
}

const getDocs = async () => {
    const uploads = await axios.get('/users/getDocs')
    return uploads.data
}

export {
    getGroups,
    getUsers,
    getDocs
} 