import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Button, CardActionArea, CardActions, CardHeader } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import Favorite from '@material-ui/icons/Favorite';
import tw from 'twin.macro';

export const GoalCardFocus = (): JSX.Element => {
   return (
      <div className="rounded-l-lg group">
         <Card className="shadow-inner hover:shadow-xl">
            <div className="relative">
               <CardActions className="absolute z-10 w-full" disableSpacing>
                  <div css={tw`flex justify-between w-full`}>
                     <IconButton className="group-hover:shadow-sm" style={{ color: 'whitesmoke' }}>
                        <Favorite />
                     </IconButton>
                     <IconButton className="group-hover:shadow-sm" style={{ color: 'whitesmoke' }}>
                        <CancelIcon />
                     </IconButton>
                  </div>
               </CardActions>
               <CardMedia
                  className="opacity-100 group-hover:shadow-inner"
                  style={{ minHeight: 90 }}
                  component="div"
                  image="https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"></CardMedia>
            </div>
            <CardContent className="group-hover:opacity-95">
               <div>
                  <Typography gutterBottom variant="h6">
                     This is my goal2 and its very long and i want to see what it does and what
                  </Typography>
               </div>
               <div css={tw`flex flex-grow`}>
                  <div css={tw`flex-grow`}>
                     <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                     </Typography>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
};
