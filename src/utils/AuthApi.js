class AuthApi {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    _getResponseData(res){
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    } 
    

    userSignUp(email, password){
      return fetch(`${this._baseUrl}/signup`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
            "password": password,
            "email": email 
          })
      })
      .then(res => {
        return this._getResponseData(res)
      })   
    }

    userSignIn(email, password){
      return fetch(`${this._baseUrl}/signin`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
            "password": password,
            "email": email 
          })
      })
      .then(res => {
        return this._getResponseData(res)
      })   
    }

    userAuthorization(JWT){
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          ...this._headers,
          "Authorization" : `Bearer ${JWT}`
        }
      })
      .then(res => {
        return this._getResponseData(res)
      })   
    }

    // другие методы работы с API
  }
  
  const authApi = new AuthApi({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  export default authApi;
  