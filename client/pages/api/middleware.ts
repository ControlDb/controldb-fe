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
    const response = await axios.get(baseURL + 'user/' + userID);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Get a specific document based on the document ID
export const getDocumentInfo = async (documentID: string) => {
  try {
    const response = await axios.get(baseURL + 'document/' + documentID);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Create a new document for a user where the inputs are the user ID and a array of json objects. Uploads to IPFS
export const createUserDocument = async (userID: string, document: any) => {
  try {
    const response = await axios.post(
      baseURL + 'user/' + userID,
      { document: document },
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