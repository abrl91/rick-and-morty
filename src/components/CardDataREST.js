import {Fragment, useEffect, useState} from "react";
import Card from "./Card";

const CardDataREST = ({ character }) => {
    const [episodes, setEpisodes] = useState([]);
    const { episode: episodesData } = character;
    const firstThreeEpisodes = episodesData.slice(0, 3);

    useEffect(() => {
        Promise.all(firstThreeEpisodes.map(ep => {
            return fetch(ep)
                .then(res => res.json())
        }))
            .then(episodesRes => {
                setEpisodes(episodesRes);
            });
    }, []);


    return <Fragment>
        <Card characterRawData={character} characterEpisodes={episodes} />
    </Fragment>
}

export default CardDataREST;
