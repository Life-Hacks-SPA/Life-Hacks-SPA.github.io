import { settings } from "../settings/appSetings.js"
const { host } = settings();

async function request(url, options) {
    try {
        let request = await fetch(url, options);
        if (!request.ok) {
            let err = await request.json()
            throw new Error(err.message)
        }

        try{
            let data = await request.json();
            return data;
        } catch (err){
            return request
        }
        
    } catch (err) {
        alert(err.message);
        throw err;
    }

}

function getOptions(method = "get", body){
    let options = {
        method,
        headers: {
            "X-Parse-Application-Id": "gqDgnHACienqrU2TiJSTLa9llSKhr93PcvZJdpBB",
            "X-Parse-REST-API-Key": "DdB3a7XMFrWLaKTCjfXDUqJHosw8zQlMFfAcCm7s"
        }
    }

    let token = sessionStorage.getItem("token");
    
    if(token !== null){
        options.headers['X-Parse-Session-Token'] = token;
    }

    if(body){
        options.headers['Content-Type'] = "application/json";
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function get(url){
    return await request(url, getOptions());
}

export async function post(url, data){
    return await request(url, getOptions('post', data));
}

export async function put(url, data){
    return await request(url, getOptions('put', data));
}

export async function del(url){
    return await request(url, getOptions('delete'));
}



