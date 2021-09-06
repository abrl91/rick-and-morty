import {Fragment} from "react";
import Card from "./Card";
import classes from './DataList.module.css';

const Characters  = ({ entries, onLoadMore }) => {
    console.log(entries, 'entries')
    const characters = entries.map(entry => {
        const firstThreeEpisodes = entry.episode.slice(0, 3);
        return <Card key={Math.random()} characterRawData={entry} characterEpisodes={firstThreeEpisodes} />
    })
    return <Fragment>
        <div className={classes.dataList}>
        {characters}
        </div>
        <div className={classes.btnWrapper}>
            <button className={classes.loadMoreBtn} onClick={onLoadMore}>Load More</button>
        </div>
    </Fragment>
}

export default Characters;
