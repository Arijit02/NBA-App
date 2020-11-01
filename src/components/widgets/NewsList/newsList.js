import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { firebaseTeams, firebaseArticles, firebaseLooper, firebase } from '../../../firebase';
import style from './newsList.css';
import Button from '../Button/button';
import CardInfo from '../CardInfo/cardInfo';


class NewsList extends Component {

    state = {
        items: [],
        teams: [],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount,
        imageURL: []
    }

    UNSAFE_componentWillMount() {
        this.request(this.state.start, this.state.end);
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
            // axios.get(`${URL}/teams`)
            // .then(res => {
            //     this.setState({
            //         teams: res.data
            //     })
            // })
        }
        
        firebaseArticles.orderByChild("id").startAt(start).endAt(end).once('value')
        .then((snapshot)=>{
            const articles = firebaseLooper(snapshot)
            const imageUrls = []
            let promise = new Promise((resolved)=>{
                articles.forEach((article)=>{
                    firebase.storage().ref('images')
                    .child(article.image).getDownloadURL()
                    .then((url) => {
                        imageUrls.push({id: article.id, url})
                    })
                })
                setTimeout(()=>{
                    resolved()
                }, 1000)
            })
            promise.then(()=>{
                this.setState({
                    items: [...this.state.items, ...articles],
                    start,
                    end,
                    imageURL: [...this.state.imageURL, ...imageUrls]
                })
            })
        }).catch((err) => console.log(err))

        // axios.get(`${URL}/articles?_start=${start}&_end=${end}`)
        // .then((res) => {
        //     this.setState({
        //         items: [...this.state.items, ...res.data],
        //         start,
        //         end
        //     })
        // })
    }

    loadMore = () => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end + 1, end);
    }

    getImageUrl = (id) => {
        for(let key in this.state.imageURL) {
            if(this.state.imageURL[key].id === id)
                return this.state.imageURL[key].url
        }
    }

    renderNews = (type) => {
        let template = null;
        switch(type) {
            case ('card'):
                template = this.state.items.map((item, i) => {
                    return (
                        <CSSTransition
                            classNames={{
                                enter: style.newslist_wrapper,
                                enterActive: style.newslist_wrapper_enter
                            }}
                            timeout={500}
                            key={i}
                        >
                            <div className={style.newslist_item}>
                                <Link to={`/articles/${item.id}`}>
                                    <CardInfo teams={this.state.teams} team={item.team} date={item.date} />
                                    <h2>{item.title}</h2> 
                                </Link>
                            </div>
                        </CSSTransition>
                    )
                })
                break;
                case ('cardMain'):
                    template = this.state.items.map((item, i) =>{
                        return (
                            <CSSTransition
                                classNames={{
                                    enter: style.newslist_wrapper,
                                    enterActive: style.newslist_wrapper_enter
                                }}
                                timeout={500}
                                key={i}
                            >
                                <Link to={`/articles/${item.id}`}>
                                    <div className={style.flex_wrapper} >
                                        <div className={style.left}
                                            style={{
                                                background: `url('${this.getImageUrl(item.id)}')`
                                            }}
                                        ><div></div>
                                        </div>
                                        <div className={style.right}>
                                            <CardInfo teams={this.state.teams} team={item.team} date={item.date} />
                                            <h2>{item.title}</h2>
                                        </div>
                                    </div>
                                </Link>
                            </CSSTransition>
                        )
                    })
                    break;
            default:
                template = null;
        }
        return template;
    }

    render() {
        return (
            <div>
                <TransitionGroup
                    component="div"
                    className="list"
                >
                    {this.renderNews(this.props.type)}
                </TransitionGroup>
                <Button 
                    type="loadmore"
                    loadMore={() => this.loadMore()}
                    cta="Load More News"
                />
            </div>
        );
    }
}

export default NewsList;