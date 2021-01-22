import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Button, CardActionArea, CardActions, CardHeader } from '@material-ui/core';

import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import tw from 'twin.macro';

export const GoalListItem = (): JSX.Element => {
   return (
      <div className="rounded-l-lg">
         <Card>
            <CardActionArea>
               <div className="flex">
                  <CardMedia
                     className="flex-grow-0"
                     style={{ height: 60, width: 60, opacity: '90%' }}
                     component="div"
                     image="https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"></CardMedia>
                  <CardContent className="flex-grow">
                     <div>
                        <Typography gutterBottom variant="h6">
                           This is my goal2
                        </Typography>
                     </div>
                     <div css={tw`flex flex-grow`}>
                        <div css={tw`flex-grow`}>
                           <Typography variant="body2" color="textSecondary" component="p">
                              Lizards are a widespread group of squamate reptiles, with over 6,000 species...
                           </Typography>
                        </div>
                     </div>
                  </CardContent>
               </div>
            </CardActionArea>
         </Card>
      </div>
   );
};
