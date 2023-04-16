import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useGlobalContext } from '../GlobalContext'

function RequireAuth({ children }) {
    const globalContext = useGlobalContext()
    const location = useLocation()

    if (!globalContext.currentUser) {
        return <Navigate to="/" state={{ from: location }} replace />
    }

    return children
}

RequireAuth.propTypes = {
    children: PropTypes.node.isRequired,
}

export default RequireAuth
