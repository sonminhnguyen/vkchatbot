const axios = require('axios');

const getGroups = async () => {
    const groups = await axios.get('/users/getGroups')
    return groups.data
}

const getUsers = async () => {
    const users = await axios.get('/users/getUsers')
    return users.data
}

export {
    getGroups,
    getUsers
} 