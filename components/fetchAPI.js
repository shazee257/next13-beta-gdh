// import https from 'https';
import axios from 'axios';


// axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });

export default function fetchAPI({ method, endPoint, data, params }) {
    const headers = {
        'Content-Type': 'application/json',
    };

    const config = {
        method,
        url: `${process.env.NEXT_PUBLIC_BaseURL}/${endPoint}`,
        headers,
        params: params ? params : {},
        data: data ? data : {},
    };

    return axios(config);
}

// const fetchAPI = async ({ method, endPoint, data }) => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BaseURL}/${endPoint}`, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: data ? JSON.stringify(data) : null,
//     });
//     return response;
// }

// export default fetchAPI;