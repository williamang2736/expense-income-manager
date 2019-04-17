// in src/dataProvider
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
  fetchUtils
} from "react-admin";
import { stringify } from "query-string";

const API_URL = "/api";

/**
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertDataProviderRequestToHTTP = (
  type,
  resource,
  params = { pagination: {}, sort: {} }
) => {
  switch (type) {
    case GET_LIST: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter)
      };
      return { url: `${API_URL}/${resource}?${stringify(query)}` };
    }
    case GET_ONE:
      if (!params.id) params.id = "";
      return { url: `${API_URL}/${resource}/${params.id}` };
    case GET_MANY: {
      const query = {
        filter: JSON.stringify({ id: params.ids })
      };
      return { url: `${API_URL}/${resource}?${stringify(query)}` };
    }
    case GET_MANY_REFERENCE: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify({ ...params.filter, [params.target]: params.id })
      };
      return { url: `${API_URL}/${resource}?${stringify(query)}` };
    }
    case UPDATE:
      return {
        url: `${API_URL}/${resource}/${params.id}/`,
        options: { method: "PUT", body: JSON.stringify(params.data) }
      };
    case CREATE:
      return {
        url: `${API_URL}/${resource}/`,
        options: { method: "POST", body: JSON.stringify(params.data) }
      };
    case DELETE:
      return {
        url: `${API_URL}/${resource}/${params.id}/`,
        options: { method: "DELETE" }
      };
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} Data Provider response
 */
const convertHTTPResponseToDataProvider = (
  response,
  type,
  resource,
  params
) => {
  const { headers, json } = response;
  switch (type) {
    case GET_LIST:
      if (!Array.isArray(json)) {
        return {
          data: json
        };
      }
      return {
        data: json.map(x => x),
        total: json.length
      };
    case CREATE:
      return { data: { ...params.data, id: json.id } };
    default:
      return { data: json };
  }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */
export default (type, resource, params) => {
  const { url, options } = convertDataProviderRequestToHTTP(
    type,
    resource,
    params
  );
  const httpClient = (url, options = {}) => {
    if (!options.headers) {
      options.headers = new Headers({ Accept: "application/json" });
    }
    const token = localStorage.getItem("token");
    options.headers.set("Authorization", `Token ${token}`);
    return fetchUtils
      .fetchJson(url, options)
      .then(response =>
        convertHTTPResponseToDataProvider(response, type, resource, params)
      );
  };
  return httpClient(url, options);
};
