// For API interacting with middle ware

import axios from 'axios';

const baseURL = 'http://localhost:10000/';

// Base route
export const baseCall = async() => {
    return await axios.get(baseURL);
}

// Get all documents uuid for a user
export const getUserDocuments = async (userID: string) => {
  try {
    const response = await axios.get(baseURL + 'documents/user/' + userID);
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
}

// Get a specific document based on the document ID
export const getDocumentInfo = async (documentID: string) => {
  try {
    const response = await axios.get(baseURL + 'document/' + documentID);
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
}

// Create a new document for a user where the inputs are the user ID and a array of json objects. Uploads to IPFS
export const createUserDocument = async (userID: string, document: any) => {
  try {
    console.log('document created', document);
    console.log('url', baseURL + 'document/' + userID);
    const array = [];
    for (let i = 0; i < document.length; i++) {
      array.push(document[0][i]);
    }
    array.push(document[1]);
    const response = await axios.post(
      baseURL + 'document/' + userID,
      array,
      );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Get Permission for a user
export const getUserPermission = async (userID: string) => {
  try {
    const response = await axios.get(baseURL + '/document/permission/' + userID);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}