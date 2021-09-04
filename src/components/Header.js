import {Fragment} from "react";
import {NavLink} from "react-router-dom";
import classes from './Header.module.css';

const Header = () => {
    return <Fragment>
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <NavLink activeClassName={classes.active} exact to='/rest'>REST Approach</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={classes.active} exact to='/reactUseQuery'>React useQuery Approach</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={classes.active} exact to='/graphql'>GraphQL Approach</NavLink>
                    </li>
                </ul>
            </nav>
        </header>

    </Fragment>
}

export default Header;
