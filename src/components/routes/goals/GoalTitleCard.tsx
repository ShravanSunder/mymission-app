import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { CardActions, useTheme } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import tw from 'twin.macro';

const text1 = `Make a life worth livign and happy`;

export const GoalTitleCard = (): JSX.Element => {
   const theme = useTheme();

   return (
      <div className="rounded-2xl group">
         <Card className="shadow-inner rounded-2xl hover:shadow-xl" raised>
            <div className="relative">
               <CardMedia
                  className="absolute w-full h-full opacity-80 group-hover:shadow-inner"
                  style={{ minHeight: 60 }}
                  component="div"
                  image="https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"></CardMedia>
               <div className="flex">
                  <div className="max-w-12">
                     <CardActions className="z-10 w-full" disableSpacing>
                        <div css={tw`flex justify-between w-full mt-1.5`}>
                           <IconButton style={{ color: 'white', padding: theme.spacing(0.5) }}>
                              <CancelIcon fontSize="medium" />
                           </IconButton>
                        </div>
                     </CardActions>
                  </div>
                  <div className="flex-grow">
                     <div className="absolute w-full h-full border-transparent shadow-md opacity-50 bg-gradienl-to-r from-transparent via-gray-700 to-gray-400 rounded-md border-opacity-90 border-12 max-h-28">
                        {/* transparent gradient background */}
                     </div>
                     <div className="absolute w-full h-full bg-gray-500 border-transparent shadow-md opacity-10  rounded-md border-opacity-90 border-12 max-h-32"></div>
                     <div className="relative z-10">
                        <CardContent style={{ paddingBottom: 16 }}>
                           <div className="overflow-y-auto text-white max-h-20">
                              <strong>
                                 <Typography variant="h2">{text1}</Typography>
                              </strong>
                           </div>
                        </CardContent>
                     </div>
                  </div>
               </div>
            </div>
         </Card>
      </div>
   );
};
