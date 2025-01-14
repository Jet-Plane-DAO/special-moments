import { useMemo } from 'react'

export default function usePostcard(campaignConfig:any) {

     const postcards = useMemo(() => {
        const postcardsInput = campaignConfig?.inputs?.find((x: any) => x.id === "postcards");
                 if (postcardsInput) {
                     return postcardsInput.options
                 }
                 return []
     },[campaignConfig])
 
  return {postcards}
}
