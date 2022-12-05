import { Link } from 'react-router-dom'

import './404.scss';

const Page404 = () => {
    return (
        <div id='page404'>
            <h1>Error 404</h1>
            <h3>Page not found :(</h3>
            <Link to="/">Home</Link>
        </div>
    )
}

export default Page404;