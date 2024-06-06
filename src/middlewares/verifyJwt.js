import * as jose from 'jose'

const decodedToken = async (token) => {
    const decoded = await jose.compactVerify(token, 'ashahaha');
    return decoded
}

export default decodedToken;