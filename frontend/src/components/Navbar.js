import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to='/'>
                    <h1>Tatras Route Checker</h1>
                    <p>Check before you go!</p>
                </Link>
                <Link to='/places'>
                    Places
                </Link>
            </div>
        </header>
    )
}

export default Navbar;