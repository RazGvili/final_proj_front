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

export function getKeyWords(text, urlForServer = 'https://5ad83887.ngrok.io') {

    //console.log(text)
    return axios.post(urlForServer, {   
        data: {"nlp_area_field": text} ,
        //responseType: 'text'
    }).then((results) =>{
        console.log(results)
        console.log(results.data[0])
        return results.data
    }).catch(err => {
        console.log(err)
        return false
    })
    
}