let recoilReferenceMap: Map<string, any>;

export const getReferenceMap = (): Map<string, any> => {
   if (recoilReferenceMap == undefined) {
      console.log('initalizeReferenceMap', 'creating new map');
      recoilReferenceMap = new Map<string, any>();
   }
   return recoilReferenceMap;
};
