import axios from 'axios';

const tokenName = 'user_jck_token';

const getLocalToken = () => {
    return JSON.parse(localStorage.getItem(tokenName));
};

const postRepository = () => {
    let baseUrl = 'http://localhost:8000/api/posts';
 //CRUD METHODS
 //Create
    const newPost = (post) => {
        return new Promise( (resolve, reject) => {
            const instance = axios.create({
                baseURL : baseUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getLocalToken()  
                }  
            });  
     
            instance.post('',post)  
            .then(r => {   
                resolve(r.data);  
            }).catch(e => {  
                console.log(e);  
                reject(e.response);  
            });  
        }); 
    };  
 // Read
    const getPost = () => {  
        return new Promise( (resolve, reject) => {  
            const instance = axios.create({  
                baseURL : baseUrl,  
    headers: {  
                    'Content-Type': 'application/json'
                    'Authorization': 'Token ' + getLocalToken()  
                }  
            });  
     
            instance.get()  
            .then(r => {   
                resolve(r.data);  
            }).catch(e => {  
                console.log(e);  
                reject(e.response);  
            });  
        }); 
    };  
 //Update
    const updatePost = (post) => {  
        return new Promise( (resolve, reject) => {  
            const instance = axios.create({  
                baseURL : baseUrl,  
    headers: {  
                    'Content-Type': 'application/json'
                    'Authorization': 'Token ' + getLocalToken()  
                }  
            });  
     
            instance.patch(post.id + '/', post)  
            .then(r => {   
                resolve(r.data);  
            }).catch(e => {  
                console.log(e);  
                reject(e.response);  
            });  
        }); 
    };  

    //Delete
    const deletePost = (idPost) => {  
        return new Promise( (resolve, reject) => {  
            const instance = axios.create({  
                baseURL : baseUrl,  
    headers: {  
                    'Content-Type': 'application/json'
                    'Authorization': 'Token ' + getLocalToken()  
                }  
            });  
     
            instance.delete(idPost + '/')  
            .then(r => {   
                resolve(r.data);  
            }).catch(e => {  
                console.log(e);  
                reject(e.response);  
            });  
        });
    };

    return {
        newPost,
        getPost,
        updatePost,
        deletePost
    }  
};

export default postRepository();