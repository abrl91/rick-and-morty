import {Fragment} from "react";
import {Link} from "react-router-dom";
import classes from './Header.module.css';

const Header = () => {
    return <Fragment>
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <Link to='/rest'>REST Approach</Link>
                    </li>
                    <li>
                        <Link to='/graphql'>GraphQL Approach</Link>
                    </li>
                </ul>
            </nav>
        </header>

    </Fragment>
}

export default Header;
