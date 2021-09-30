const axios = require('axios');

const getGroups = async () => {
    const groups = await axios.get('http://localhost:3000/users/getGroup')
    return groups.data
}

export {
    getGroups
} 