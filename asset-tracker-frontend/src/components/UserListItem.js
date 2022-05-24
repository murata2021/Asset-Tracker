import { useHistory } from 'react-router-dom'
import {Link} from 'react-router-dom'

const UserListItem=(props)=>{
    const history=useHistory()
    const handleClick=()=>{
        history.push(`/users/${user.id}`)
    }
    


    const {user}=props
    return(
        <>
            {/* <Link style={{cursor:'pointer',textDecoration:"none",color:'black'}} to={`/users/${user.id}`}>
                <li className='list-group-item list-group-item-action'>
                    <span style={{marginLeft:"4px"}}>{user.username}</span>
                </li>
            </Link> */}
            {/* <Link style={{cursor:'pointer',textDecoration:"none",color:'black'}} to={`/users/${user.id}`}> */}
            
                <tr onClick={handleClick}>
                    <td > 
                    {user.username}
                    </td>

                    <td>
                    {user.email}
                    </td>
                    <td>
                    {user.fullName?user.fullName:"-"}
                    </td>
                    <td>
                    {user.isAdmin?"Admin":"Technician"}
                    </td>
                    <td>
                    {user.inactive?"inactive":"active"}
                    </td>
                    
                </tr>
                
                {/* <li className='list-group-item list-group-item-action'>
                    <span style={{marginLeft:"4px"}}>{user.username}</span>
                </li> */}
            {/* </Link> */}

        </>
    )

}

export default UserListItem;