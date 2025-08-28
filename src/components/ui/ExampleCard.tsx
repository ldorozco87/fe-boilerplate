'use client';

import React from 'react';
import styles from './ExampleCard.module.scss';

interface ExampleCardProps {
  title: string;
  description: string;
  buttonText?: string;
  featured?: boolean;
  onClick?: () => void;
}

export default function ExampleCard({
  title,
  description,
  buttonText = 'Learn More',
  featured = false,
  onClick,
}: ExampleCardProps) {
  return (
    <div className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <button className={styles.button} onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
}
