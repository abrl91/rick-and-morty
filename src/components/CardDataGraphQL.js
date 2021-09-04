import {Fragment} from "react";
import Card from "./Card";

const CardDataGraphQL = ({ character }) => {
    const { episode: episodesData } = character;
    const firstThreeEpisodes = episodesData.slice(0, 3);

    return <Fragment>
       <Card characterRawData={character} characterEpisodes={firstThreeEpisodes} />
    </Fragment>
}

export default CardDataGraphQL;
