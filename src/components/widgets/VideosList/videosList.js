import React, { Component } from 'react';
import Button from '../Button/button';
import style from './videosList.css';
import { firebaseVideos, firebaseLooper, firebaseTeams } from '../../../firebase';

import VideosListTemplate from './videosList_template';

class VideosList extends Component {

    state = {
        teams: [],
        videos: [],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount
    }

    UNSAFE_componentWillMount() {
        this.request(this.state.start, this.state.end);
    }

    loadMore = () => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end + 1, end)
    }

    renderVideos = () => {
        let template = null;
        switch(this.props.type) {
            case('card'):
                template = <VideosListTemplate teams={this.state.teams} data={this.state.videos} />
                break;
            default: 
                template = null;
        }
        return template;
    }

    renderButton = () => {
        return this.props.loadmore ? 
            <Button type="loadmore" cta="Load More Videos" loadMore={() => this.loadMore()} />
            :
            <Button type="linkTo" cta="More videos" linkTo="/videos" />
    }

    renderTitle = () => {
        return (
            this.props.title ? 
            <h3><strong>NBA</strong> Videos</h3> 
            : null
        )
    }

    request = (start, end) => {
        if(this.state.teams.length < 1) {
            firebaseTeams.once('value')
            .then((snapshot) => {
                const teams = firebaseLooper(snapshot)
                this.setState({
                    teams
                })
            })
        }
        firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
        .then((snapshot)=>{
            const videos = firebaseLooper(snapshot)
            this.setState({
                videos: [...this.state.videos, ...videos],
                start,
                end
            })
        }).catch((err) => console.log(err))
    }

    render() {
        return (
            <div className={style.videoList_wrapper}>
                {this.renderTitle()}
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        );
    }
}

export default VideosList;