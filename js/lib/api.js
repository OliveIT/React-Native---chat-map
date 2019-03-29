import config from '../config/appConfig';

class Api {
  static headers() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      dataType: 'json'
    };
  }

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT');
  }

  static patch(route, params) {
    return this.xhr(route, params, 'PATCH');
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST');
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE');
  }

  static upload(route, params) {
    return this.xhr(route, params, 'UPLOAD');
  }

  static xhr(route, params, verb) {
    const host = config.baseUrl;
    const url = `${host}${route}`;
    var method = verb;
    if (method == 'UPLOAD') method = 'POST';
    let options = Object.assign(
      { method: method },
      params ? { body: JSON.stringify(params) } : null
    );
    if (verb == 'UPLOAD') {
      options.body = params;
    } else {
      options.headers = Api.headers();
    }
    return fetch(url, options)
      .then(resp => {
        let json = resp.json();

        return json;

        // return json.then(err => {throw err});
      })
      .then(json => json);
  }
}

export default Api;
