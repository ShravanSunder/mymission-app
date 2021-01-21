import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Button, CardActionArea, CardActions, CardHeader } from '@material-ui/core';

import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import tw from 'twin.macro';

// need to pass down w-full and set overflow in all panes
export const AreaScroll = (): JSX.Element => {
   return (
      <div className="w-full max-w-full overflow-hidden rounded-l-lg">
         <div
            css={[
               tw`flex w-full `,
               { flex: '1 1 auto', overflow: 'auto', overflowScrolling: 'touch', WebkitOverflowScrolling: 'touch', WebkitScrollbar: { display: 'none' } },
            ]}>
            <div>
               <CardMedia
                  style={{ height: 50, width: 50, opacity: '80%' }}
                  component="div"
                  image="https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"></CardMedia>
               <Typography>Area 1</Typography>
            </div>
            <div>
               <CardMedia
                  style={{ height: 50, width: 50, opacity: '80%' }}
                  component="div"
                  image="https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"></CardMedia>
               <Typography>Area 1</Typography>
            </div>
            <div>
               <CardMedia
                  style={{ height: 50, width: 50, opacity: '80%' }}
                  component="div"
                  image="https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"></CardMedia>
               <Typography>Area 1</Typography>
            </div>
            <div>
               <CardMedia
                  style={{ height: 50, width: 50, opacity: '80%' }}
                  component="div"
                  image="https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"></CardMedia>
               <Typography>Area 1</Typography>
            </div>
            <div>
               <CardMedia
                  style={{ height: 50, width: 50, opacity: '80%' }}
                  component="div"
                  image="https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"></CardMedia>
               <Typography>Area 1</Typography>
            </div>
            <div>
               <CardMedia
                  style={{ height: 50, width: 50, opacity: '80%' }}
                  component="div"
                  image="https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"></CardMedia>
               <Typography>Area 1</Typography>
            </div>
            <div>
               <CardMedia
                  style={{ height: 50, width: 50, opacity: '80%' }}
                  component="div"
                  image="https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"></CardMedia>
               <Typography>Area 1</Typography>
            </div>
         </div>
      </div>
   );
};
