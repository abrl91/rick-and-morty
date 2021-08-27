import {Fragment} from "react";

const Card = ({ characters }) => {
    const { id, name, image, status, species, location } = characters;
    return <Fragment>
        <div key={id} className="card">
            <h1>{name}</h1>
            <img src={image} alt={name}/>
            <p>{status}</p>
            <p>{species}</p>
            <p>{location.name}</p>
        </div>
    </Fragment>
}

export default Card;
