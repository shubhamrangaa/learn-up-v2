import React from 'react';

import style from './ResourceCard.module.css';

function ResourceCard(resource) {
  console.log(JSON.stringify(new Date(resource.resource.date.seconds * 1000)));
  return (
    <div className={style.card}>
      <div className={style.content}>
        <h2 className={style.text}>{resource.resource.title}</h2>
        <div className={style.meta}>
          <p className={style.text}>{resource.resource.email}</p>
          <p className={style.text}>
            {JSON.stringify(
              new Date(resource.resource.date.seconds * 1000)
            ).slice(1, 11)}
          </p>
          <p className={`${style.text} ${style.bubble}`}>
            {resource.resource.standard.toUpperCase()}
          </p>
          <p className={`${style.text} ${style.bubble}`}>
            {resource.resource.subject}
          </p>
        </div>
        <p className={style.text}>{resource.resource.description}</p>
        <div className={style.cta}>
          <a
            target='_blank'
            className={style.link}
            href={resource.resource.link}
            rel={'noreferrer'}
          >
            Learn More
          </a>
          <a href='#' className={style.bookmark}>
            Bookmark
          </a>
        </div>
      </div>
      <div className={style.image}>
        <img
          src='https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073'
          alt=''
        />
      </div>
    </div>
  );
}

export default ResourceCard;
