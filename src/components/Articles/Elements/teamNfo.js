import React from 'react';
import style from '../articles.css';

const TeamNfo = (props) => {
    return (
        <div className={style.articleTeamHeader}>
            <div className={style.left}
                style={{
                    background: `url('/images/teams/${props.team.logo}')`
                }}
            >

            </div>
            <div className={style.right}>
                <div>
                    <span>{props.team.city} {props.team.name}</span>
                </div>
                <div>
                    <strong>
                        W{props.team.stats[0].wins}-L{props.team.stats[0].defeats}
                    </strong>
                </div>
            </div>
        </div>
    );
};

export default TeamNfo;