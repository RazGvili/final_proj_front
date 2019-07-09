import axios from 'axios'

export function getImagesByKeyWord(keyWord) {

    return axios.get('https://api.unsplash.com/search/photos' ,
    {
        params:{ query: keyWord },
        headers: {
            Authorization: 'Client-ID 4b78c36927e278fdd720b047ada511d2b3156223c70ba0589e13c2b027d95bc2'
        }

    }).then((results) =>{
        console.log(results)
        return results
    }).catch(err => {console.log(err)})
    
}

export function getImagesByKeyWordShutter(keyWord) {

    const applicationClientId = "d5eb4-1d638-3b498-d60c5-3a57c-36da5"
    const applicationClientSecret = "5cbbd-a9bbc-96d94-61879-76a79-7f42d"    

    return axios.get('https://api.shutterstock.com/v2/images/search' , {
            auth: { 
                username: applicationClientId,
                password: applicationClientSecret
            },
            params: { 
                query: keyWord,
            }
        }).then((results) =>{
        console.log(results)
        return results
    }).catch(err => {console.log(err)})
}

export function getKeyWords(text) {

    return axios.get('https://us-central1-wise-invention-246014.cloudfunctions.net/function-1' , {   
        data: text ,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*'
        },
        responseType: 'text'
    }).then((results) =>{
        console.log(results)
        return results
    })
    
}