export const ADDNOTE = (item) => {
    // console.log(item, '--->item');
    return {
        type:"ADD_NOTES",
        payload:item
    }
}

export const UPDATEDATA = (item) => {
    // console.log(item, '---->update-item');
    return{
        type: "UPDATED_DATA",
        payload: item
    }
}

export const UPDATEDES = (item) => {
    // console.log(item, '---->update-item');
    return{
        type: "UPDATED_DESCRIPTION",
        payload: item
    }
}

export const DELETEDATA = (item) => {
    return {
        type:"DELETE_DATA",
        payload:item
    }
}