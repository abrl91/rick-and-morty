import {useState} from "react";

const useConstruct = (dataToConstruct) => {
    const [results, setResults] = useState([]);

    dataToConstruct.map(character => {
        const slimEpisodeArr = character.episode.slice(0, 5);
        return Promise.all(slimEpisodeArr.map(ep => {
            return fetch(ep)
                .then(res => res.json())
        }))
            .then(episodesRes => {
                const characterResultsExpended = {...character, episode: episodesRes};
                console.log(characterResultsExpended);
                setResults(characterResultsExpended);
            });
    });
    return [results];

}

export default useConstruct;
