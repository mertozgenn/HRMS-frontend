import { favoriteAdverts } from "../initialValues/favoriteAdverts"
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES} from "../actions/favoritesActions"

const initialState = {
    favoriteAdverts : favoriteAdverts
}

export default function favoritesReducer(state = initialState, {type, payload}){
    switch (type) {
        case ADD_TO_FAVORITES:
            let advert = state.favoriteAdverts.find(advert => advert.id === payload.id)
            if (advert) {
                return {
                    ...state
                }
            } else {
            return {
                ...state,
                favoriteAdverts : [...state.favoriteAdverts, payload]
            }
        }
        case REMOVE_FROM_FAVORITES:
            return {
                ...state,
                favoriteAdverts : state.favoriteAdverts.filter(advert => advert.id !== payload.id)
            }
        default: return state
    }
}