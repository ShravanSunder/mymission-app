import * as React from 'react';
import { CardActions, useTheme, Card, CardContent, IconButton, Typography, CardMedia } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import tw from 'twin.macro';

const text1 = `This is my goal2 and its very long and i want to see what it does and what This is my goal2 and its very long and i want to see
what it does and what This is my goal2 and its very long and i want to see what it does and what This is my goal2 and its very`;

export const GoalSelectedCard = (): JSX.Element => {
   const theme = useTheme();

   return (
      <div className="rounded-l-lg group">
         <Card className="shadow-inner hover:shadow-xl" raised>
            <div className="relative">
               <CardMedia
                  className="absolute w-full h-full opacity-80 group-hover:shadow-inner"
                  style={{ minHeight: 60 }}
                  component="div"
                  image="https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"></CardMedia>
               <CardActions className="z-10 w-full" disableSpacing>
                  <div css={tw`flex justify-between w-full`}>
                     <IconButton style={{ color: 'white', padding: theme.spacing(0.5) }}>
                        <CancelIcon fontSize="medium" />
                     </IconButton>
                  </div>
               </CardActions>
               <div className="absolute w-full h-full border-transparent shadow-md opacity-50 bg-gradient-to-b from-transparent via-gray-700 to-gray-400 rounded-md border-opacity-90 border-12 max-h-28">
                  {/* transparent gradient background */}
               </div>
               <div className="absolute w-full h-full bg-gray-500 border-transparent shadow-md opacity-5 to-gray-600 rounded-md border-opacity-90 border-12 max-h-32"></div>
               <div className="relative z-10">
                  <CardContent style={{ paddingBottom: 16, paddingTop: 0 }}>
                     <div className="overflow-y-auto text-white max-h-20">
                        <strong>
                           <Typography gutterBottom variant="body1">
                              {text1}
                           </Typography>
                        </strong>
                     </div>
                  </CardContent>
               </div>
            </div>
         </Card>
      </div>
   );
};
