var typeUpPost = (state = { typePost: "default", }, action) => {
    switch (action.type) {
        case 'TANGCONGDONG':
            return {
                ...state,
                typePost: "tangcongdong"
            }
        case 'CANXINDO':
            return {
                ...state,
                typePost: "canxindo"
            }
        case 'DEFAULT': 
            return {
                ...state,
                typePost: "default"
            }
        default:
            return state
    }
}

export default typeUpPost;