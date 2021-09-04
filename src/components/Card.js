import {Fragment} from "react";
import classes from "./Card.module.css";

const Card = ({ characterRawData, characterEpisodes }) => {
    const {id, name, image, status, location, species} = characterRawData;

    const episodesToDisplay = characterEpisodes.map(episode => (
        <li key={episode.id}>{episode.name}</li>
    ))

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
                    {episodesToDisplay}
                </ul>
            </div>

        </div>
    </Fragment>
}

export default Card;
