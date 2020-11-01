import React, { Component } from 'react';

import style from '../../articles.css';
import Header from './header';
import VideosRelated from '../../../widgets/VideosList/VideosRelated/videosRelated';
import { firebaseDB, firebaseTeams, firebaseLooper, firebaseVideos } from '../../../../firebase';

class VideoArticle extends Component {

    state = {
        article: [],
        team: [],
        teams: [],
        related: []
    }

    UNSAFE_componentWillMount() {

        firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
        .then((snapshot)=>{
            let article = snapshot.val();
            firebaseTeams.orderByChild('id').equalTo(article.team).once('value')
            .then((snapshot)=>{
                let team = firebaseLooper(snapshot)
                this.setState({
                    article, 
                    team
                })
                this.getRelated();
            })
        })
        // axios.get(`${URL}/videos?id=${this.props.match.params.id}`)
        // .then(res => {
        //     let article = res.data[0];
        //     axios.get(`${URL}/teams?id=${article.team}`)
        //     .then(res => {
        //         this.setState({ 
        //             article,
        //             team: res.data
        //         })
        //     })
        //     this.getRelated();
        // })
    }


    getRelated = () => {
        firebaseTeams.once('value')
        .then((snapshot)=>{
            let teams = firebaseLooper(snapshot)
            firebaseVideos.orderByChild('team')
            .equalTo(this.state.article.team)
            .limitToFirst(3)
            .once('value')
            .then((snapshot)=>{
                let related = firebaseLooper(snapshot)
                this.setState({
                    teams, 
                    related
                })
            })
        })

        // axios.get(`${URL}/teams`)
        // .then((res) => {
        //     let teams = res.data;
        //     axios.get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
        //     .then((res) => {
        //         this.setState({
        //             teams,
        //             related: res.data
        //         })
        //     })

        // })
    }

    render() {
        const article = this.state.article;
        const team = this.state.team;

        return (
            <div>
                <Header teamData={team[0]} />
                <div className={style.videoWrapper}>
                    <h1>{article.title}</h1>
                    <iframe 
                        title="videoplayer"
                        height="300px"
                        width="100%"
                        src={`https://www.youtube.com/embed/${article.url}`}
                    />
                </div>
                <VideosRelated 
                    data={this.state.related}
                    teams={this.state.teams}
                />
            </div>
        );
    }
}

export default VideoArticle;