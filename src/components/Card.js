import {Fragment} from "react";

const Card = ({ character }) => {
    const { id, name, image, status, species, location, episode } = character;
    return <Fragment>
        <div key={id} className="card">
            <h1>{name}</h1>
            <img src={image} alt={name}/>
            <p>{status}</p>
            <p>{species}</p>
            <p>{location.name}</p>
            <p>Episodes:</p>
            <ul>
                {episode.map(ep => (
                    <li key={ep.id}>{ep.name}</li>
                ))}
            </ul>
        </div>
    </Fragment>
}

export default Card;
