import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import styles from './styles.scss';

const Suggestion = ({
  description,
  highlighted,
  title,
  image,
}) => (
  <Card
    className={styles.Card.concat(' ', highlighted && styles.CardSelected)}
    key={title}
  >
    {image && <CardMedia image={image} className={styles.CardMedia} />}
    <CardContent className={styles.CardContent}>
      <Typography variant="headline">{title}</Typography>
      <Typography variant="subheading">{description}</Typography>
    </CardContent>
  </Card>
);

Suggestion.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  highlighted: PropTypes.bool.isRequired,
  image: PropTypes.string,
};

export default Suggestion;
