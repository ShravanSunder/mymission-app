import * as React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { Button, CardActionArea, CardActions, CardHeader } from '@material-ui/core';

export const GoalCard = (): JSX.Element => {
   return (
      <Card>
         <CardMedia
            style={{ height: 150 }}
            component="div"
            image="https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"></CardMedia>
         {/* <CardHeader
            avatar={<div>😀</div>}
            disableTypography
            title={<Typography variant="h6">This is my goal</Typography>}
            subheader={<Typography variant="subtitle2">my catch phrase</Typography>}></CardHeader> */}
         <CardContent>
            <Typography gutterBottom variant="h6">
               This is my goal
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
               Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
            </Typography>
         </CardContent>
         <CardActions>
            <Button size="small" color="primary">
               Share
            </Button>
         </CardActions>
      </Card>
   );
};
