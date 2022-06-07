import React, { useState } from 'react';
import ResourceCard from './ResourceCard';
import styles from './ResourceList.module.css';

function ResourceList({ heading, resources, filter, getResources, subject }) {
  let topics;
  let filterType;
  if (subject == undefined) {
    topics = ['12th Grade', 'Marketing', 'Computer Science', '10th Grade'];
    filterType = 'displayCategory';
  } else {
    topics = subject;
    filterType = 'topic';
  }
  console.log(topics);
  return (
    <div className={styles.main}>
      <div className={styles.feed}>
        <h1>{heading}</h1>
        {resources?.length > 0 ? (
          resources.map((resource, i) => {
            return <ResourceCard key={i} resource={resource} />;
          })
        ) : (
          <h5>We do not have anything to show yet</h5>
        )}
      </div>
      <div className={styles.filters}>
        <h3>Browse Topics</h3>
        <div className={styles.topicContainer}>
          <p className={styles.topic} onClick={() => getResources()}>
            All
          </p>
          {topics.map((topic, i) => {
            return (
              <p
                key={i}
                className={styles.topic}
                onClick={() => filter(filterType, topic)}
              >
                {topic}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ResourceList;
