import axios from 'axios';

const authRepository = () => {
    let baseUrl = 'http://localhost:7559/login';
  
    //Dar un nombre al token local
    const tokenName = 'user_jck_token';
    // Obtener el usuario Determinar si está logeado o no
    const getLocalToken = () => {
        return JSON.parse(localStorage.getItem(tokenName));
    };
    
    const logIn = user => {
        // Retornar una nueva promesa, la promesa es como un try catch  
        // el constructor recibe una funcion (arrow function) 
        // donde recibe resolve y reject  
        return new Promise((resolve, reject) => {
        // Creamos una instancia de axios, para poder
        // comunicarnos con el servidor // axios.create recibe un objeto en donde pasamos
        // baseURL y headers
            const instance = axios.create({
                //baseURL es la url del endpoint
                baseURL: baseUrl,
                // headers es lo necesario para hacer la petición
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Ejecutamos un método http, el primer argumento es
            // la url (si queremos agregar algo más a la url)
            // el segundo es el objeto con la información
            // necesaria
            instance.post('login/', user)
            .then(r => {
                // si es correcto
                // guardamos el resultado (el token de JWT)
                // en la base de datos (Local Storage)
                // El primer argumento es el nombre con el que se va a guardar
                // El segundo es la información que se guardara
                // Siempre debe hacer una llamada a JSON.stringify
                localStorage.setItem(tokenName, JSON.stringify(r.data.key));
                // si es correcto, mediante resolve, retornamos la Promise
                resolve(r.data);
            }).catch(e => {  
                console.log(e); 
                // Si algo salio mal, mediante reject, retornamos la promise
                reject(e.response);
            });
        });
    };
    const signUp = user => {
        return new Promise((resolve, reject) => {
            const instance = axios.create({
                baseURL: baseUrl,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            instance.post('registration/', user)
            .then(r => {
                localStorage.setItem(tokenName, JSON.stringify(r.data.key));
                resolve(r.data);
            }).catch(e => {
                console.log(e);
                reject(e.response);
            });
        });
    };
    const logOut = () => {
        return new Promise((resolve, reject) => {
            const instance = axios.create({
                baseURL: baseUrl,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            instance.post('logout/', {})
            .then(r => {
                localStorage.removeItem(tokenName);
                resolve(r.data);
            }).catch(e => {
                console.log(e);
                reject(e.response);
            });
        });
    };
    
    return {
        logIn,
        signUp,
        logOut
    }
};

export default authRepository();