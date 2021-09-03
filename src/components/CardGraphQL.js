import {Fragment} from "react";
import classes from './Card.module.css';

const Card = ({ character }) => {
    const { id, name, image, status, species, location, episode: episodesData } = character;
    const firstThreeEpisodes = episodesData.slice(0, 3);

    const episodesArr = firstThreeEpisodes.map(ep => (
        <li className={classes.episodesList} key={ep.id}>{ep.name}</li>
    ));

    return <Fragment>
        <div key={id} className={classes.card}>
            <div className={classes.cardLeft}>
                <img src={image} alt={name}/>
            </div>
            <div className={classes.cardRight}>
                <h1>{name}</h1>
                <p><span>Status:</span> {status}</p>
                <p><span>Species:</span> {species}</p>
                <p><span>Location:</span> {location.name}</p>
                <p><span>Episodes:</span></p>
                <ul>
                    {episodesArr}
                </ul>
            </div>

        </div>
    </Fragment>
}

export default Card;