import React from 'react';
import style from '../videosList.css';
import VideosListTemplate from '../videosList_template';

const VideosRelated = (props) => {
    return (
        <div className={style.relatedWrapper}>
            <VideosListTemplate 
                data={props.data}
                teams={props.teams}
            />
        </div>
    );
};

export default VideosRelated;