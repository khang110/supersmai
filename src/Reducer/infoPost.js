var infoPost = (state = {
    TypeAuthor: "tangcongdong", address: "", title: "", note: "", NameProduct: "", image: [], 
    noteTransac: "",
}, action) => {
    switch (action.type) {
        case 'CONFIRM_ADDRESS':
            return {
                ...state,
                address: action.address
            };
        case 'GET_NAME':
            return {
                ...state,
                NameProduct: action.NameProduct
            }
        case 'GET_TITLE':
            return {
                ...state,
                title: action.title
            }
        case 'GET_NOTE':
            return {
                ...state,
                note: action.note
            }
        case 'GET_NOTE_TRANSAC':
            return {
                ...state,
                noteTransac: action.noteTransac
            }
        case 'GET_IMG':
            return {
                ...state,
                image: action.image
            }
        case 'SET_TYPE_AUTHOR':
            return {
                ...state,
                TypeAuthor: action.TypeAuthor
            }
        case 'RESET':
            return {
                ...state,
                image: [],
                title: "",
                note: "",
                TypeAuthor: "",
                noteTransac: ""
            }
        case 'RESET_SCREEN_INFORMATION':
            return {
                ...state,
                image: [],
                title: '',
                note: '',
                noteTransac: '',
            }
        default:
            return state
    }
}

export default infoPost;