import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Dropdown, Button, Label } from 'semantic-ui-react'
import { removeFromFavorites } from '../store/actions/favoritesActions'

export default function Favorites() {
    const { favoriteAdverts } = useSelector(state => state.favorites)
    const dispatch = useDispatch()
    const handleRemoveFromFavorites = (advert) =>{
        dispatch(removeFromFavorites(advert))
        toast.error("Silindi")
    }
    return (
        <div>
            <Dropdown item text='Favoriler'>
                <Dropdown.Menu>
                    {
                        favoriteAdverts.map((advert) => (
                            <Dropdown.Item as={NavLink} to={`/jobadverts/${advert.id}`} key={advert.id}>Şirket: {advert.employer.companyName}
                                <Label>
                                   Pozisyon: {advert.position.name}
                                </Label>
                                <Button onClick={()=> {handleRemoveFromFavorites(advert)}} color="red">Sil</Button>
                            </Dropdown.Item>
                        ))
                    }
                    <Dropdown.Divider />
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
