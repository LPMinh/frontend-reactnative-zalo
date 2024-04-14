import { err } from "react-native-svg";
import requestApi from "../request/request";
import { Alert } from "react-native";



export const createGroup = async (groupName, ownerId, ownerName, avatar, members)=>{
    try{
        
        const formdata = new FormData();
        formdata.append('groupName', groupName);
        formdata.append('ownerId', ownerId);
        formdata.append('ownerName', ownerName);
        formdata.append('avatar', avatar);
        members.forEach(member => {
              formdata.append('membersId', member);
         }
         );
         const response = await requestApi("/groups", "POST", formdata, true, "multipart/form-data",null);
        return response.data;
    }catch(error){
        console.error("error in create group",error.response.data);
        return Promise.reject(error);
    }
}

export const getGroupById = async (groupId) => {
    const response = await requestApi(`/groups/${groupId}`, 'GET', null, true, 'application/json')
    .then((response) => {
        return response.data;
    }).catch((error) => {
        console.error(error);
        return null;
    });
    return response;
}

export const addMemberToGroup = async (adderId, membersId,groupId) => {
    const response = await requestApi(`/groups/addMember`, 'POST', {adderId:adderId,membersId:membersId,groupId:groupId}, true, 'application/json')
    .then((response) => {
        return response.data;
    }).catch((error) => {
        console.error(error);
        return null;
    });
    return response;
}

export const leaveGroup = async ( memberId,groupId) => {
    try{
        const response = await requestApi(`/groups/leaveGroup`, 'PUT', {memberId:memberId,groupId:groupId}, true, 'application/json')
        return response.data;
    }catch(error){   
        return Promise.reject(error);
    }
}

export const findListGroupBySenderId = async (senderId) => {
    try{
        const response = await requestApi(`/groups?senderId=${senderId}`, 'GET', null, true, 'application/json');
        return response.data;
    }catch(error){
        console.error(error);
        return null;
    }
}

export const addAdmin = async (groupId, memberId,ownerId) => {
    console.log('groupId',groupId);
    console.log('memberId',memberId);
    console.log('ownerId',ownerId);
    try{
        const response = await requestApi(`/groups/addAdmin`, 'PUT', {groupId:groupId,adminId:memberId,ownerId:ownerId}, true, 'application/json');
        return response.data;
    }catch(error){
        console.error(error);
        return null;
    }
}

export const removeMember = async (groupId, memberId,adminId) => {
    try{
        const response = await requestApi(`/groups/removeMember`, 'POST', {groupId:groupId,memberId:memberId,adminId:adminId}, true, 'application/json');
        return response.data;
    }catch(error){
        console.error(error);
        return null;
    }
}

export const removeAdmin = async (groupId, ownerId,adminId) => {
    try{
        const response = await requestApi(`/groups/removeAdmin`, 'PUT', {groupId:groupId,ownerId:ownerId,adminId:adminId}, true, 'application/json');
        return response.data;
    }catch(error){
        console.error(error);
        return null;
    }
}

export const removeGroup = async (groupId, ownerId) => {
    try{
        console.log('groupId',groupId);
        console.log('ownerId',ownerId);
        const response = await requestApi(`/groups/remove`, 'DELETE', {ownerId:ownerId,groupId:groupId}, true, 'application/json');
        return response.data;
    }catch(error){
        console.error(error);
        return null;
    }
}