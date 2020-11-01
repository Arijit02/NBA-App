import React from 'react';
import VideosList from '../../../widgets/VideosList/videosList';

const VideosMain = () => {
    return (
        <VideosList 
            type="card"
            title={false}
            loadmore={true}
            start={0}
            amount={8}
        />
    );
};

export default VideosMain;