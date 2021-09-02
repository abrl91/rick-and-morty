import {Fragment, useEffect, useState} from "react";

const Card = ({ character }) => {
    const [characterEpisodes, setCharacterEpisodes] = useState([]);
    const { id, name, image, status, species, location, episode } = character;
    const firstFiveEpisodes = episode.slice(0, 5);

    useEffect(() => {
        Promise.all(firstFiveEpisodes.map(ep => {
            return fetch(ep)
                .then(res => res.json())
        }))
            .then(episodesRes => {
                setCharacterEpisodes(episodesRes);
            });
    }, [firstFiveEpisodes]);

    const episodesArr = characterEpisodes.map(ep => (
        <li key={ep.id}>{ep.name}</li>
    ));

    return <Fragment>
        <div key={id} className="card">
            <h1>{name}</h1>
            <img src={image} alt={name}/>
            <p>{status}</p>
            <p>{species}</p>
            <p>{location.name}</p>
            <p>Episodes:</p>
            <ul>
                {episodesArr}
            </ul>
        </div>
    </Fragment>
}

export default Card;
