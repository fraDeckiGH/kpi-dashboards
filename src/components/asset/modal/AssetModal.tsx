import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { XIcon, LinkIcon, BookmarkIcon } from 'lucide-react'
import { useAssetModalRendererStore } from '@/components/asset/modal/AssetModalRenderer'
import { create } from 'zustand'
import { createSelectors } from '@/lib/zustand'
import { AssetBase } from '@/lib/db/types'

interface Props {
  children: React.ReactNode
  icon: React.ReactNode
}

/** use as a base for other modals, never directly */
export default function AssetModal({ children, icon }: Props) {
  // const icon = useAssetModalStore.use.icon()
  const asset = useAssetModalRendererStore.use.asset() as AssetBase
  const handleCloseModal = useAssetModalRendererStore.use.handleCloseModal()
  const isModalOpen = useAssetModalRendererStore.use.isModalOpen()
  
  return (
    <Dialog 
      open={isModalOpen} 
      onOpenChange={handleCloseModal}
    >
      <DialogContent 
        // max-w-4xl
        className="
          max-h-[95vh] overflow-y-auto
          gap-4
          w-full sm:w-auto
        "
        closeBtn={false}
      >
        <div className="sm:w-xl"></div>
        
        <div className="absolute top-2 right-2
          flex 
        ">
          {/* focus:ring-ring focus:ring-2 focus:ring-offset-2 */}
          <Button variant="ghost" size="icon" className="
            ring-offset-background data-[state=open]:bg-accent data-[state=open]:text-muted-foreground rounded-xs opacity-70 transition-opacity hover:opacity-100  focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
          ">
            <LinkIcon></LinkIcon>
          </Button>
          <DialogClose asChild>
            {/* focus:ring-ring focus:ring-2 focus:ring-offset-2 */}
            <Button variant="ghost" size="icon" className="
              ring-offset-background data-[state=open]:bg-accent data-[state=open]:text-muted-foreground rounded-xs opacity-70 transition-opacity hover:opacity-100  focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
            ">
              <XIcon></XIcon>
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </div>
        
        <DialogHeader>
          <div className="mx-auto inline-flex items-center">
            <div className="flex flex-col items-center">
              {icon}
              
              <DialogTitle className="text-2xl font-bold">
                <span className="inline-flex items-start gap-2">
                  {asset.name}
                  <span className="
                    mt-1  px-2 py-1
                    bg-gray-100 text-gray-600
                    text-xs rounded-md
                    uppercase
                  ">
                    {/* {asset.type} */}
                    {asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}
                  </span>
                </span>
              </DialogTitle>
              
              <DialogDescription className="">
                {asset.descShort}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {children}

        <DialogFooter>
          <Button className="w-full" variant="default">
            <BookmarkIcon></BookmarkIcon>
            Favorite Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const useAssetModalStore = createSelectors(
  create<{
    icon: React.ReactNode
    setIcon: (icon: React.ReactNode) => void
  }>()((set) => ({
    icon: null, 
    setIcon: (icon) => set({ icon }), 
  }))
)
