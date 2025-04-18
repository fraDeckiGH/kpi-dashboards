import React, { useState } from 'react'
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
import { PackagePlusIcon, SendIcon, ChevronDownIcon } from 'lucide-react'
import { create } from 'zustand'
import { createSelectors } from '@/lib/utils/zustand'

const areas = [ 'Featured', 'KPI', 'Layouts', 'Storyboards' ] as const
type Area = (typeof areas[number]) | ""

/** use as a base for other modals, never directly */
export default function RequestModal() {
  const area = useRequestModalStore.use.area()
  const setArea = useRequestModalStore.use.setArea()
  const isOpen = useRequestModalStore.use.isOpen()
  const setIsOpen = useRequestModalStore.use.setIsOpen()
  
  // #region form
  // const [area, setArea] = useState<Area>("")
  const [reason, setReason] = useState("")

  const isFormValid = area && (reason.trim().length > 0)
  // #endregion form
  
  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={() => {
        // reset to initial values
        setArea("")
        setIsOpen(false)
      }}
    >
      <DialogContent 
        // max-w-4xl
        className="
          max-h-[95vh] overflow-y-auto
          gap-4
          w-full sm:w-auto
        "
      >
        <div className="sm:w-xl"></div>
        
        <DialogHeader>
          <div className="mx-auto inline-flex items-center">
            <div className="flex flex-col items-center">
              {/* icon */}
              <div className="
                mb-3 p-3 rounded-md
                bg-slate-100 text-slate-500 
              ">
                <PackagePlusIcon size={32} />
              </div>
              
              <DialogTitle className="text-2xl font-bold">
                Request
              </DialogTitle>
              
              <DialogDescription className="">
                Request access/feature
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
              Involved Area
            </label>
            <div className="relative">
              <ChevronDownIcon 
                className="absolute right-3 top-1/2 -translate-y-1/2 
                  h-4 w-4 text-gray-500 
                  pointer-events-none
                " 
              />
              <select
                id="area"
                className="w-full rounded-md 
                  border border-gray-300 bg-white px-3 py-2 text-sm 
                  outline-none appearance-none
                  focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
                "
                defaultValue={area}
                onChange={(e) => {
                  setArea(e.target.value as Area)
                }}
              >
                <option 
                  className="text-muted-foreground" 
                  disabled
                  value="" 
                >
                  Select an area
                </option>
                {areas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
              Reason / Explanation
            </label>
            <textarea
              id="reason"
              className="w-full rounded-md 
                border border-gray-300 bg-white px-3 py-2 text-sm 
                min-h-32
                placeholder:text-muted-foreground
                outline-none
                focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
                resize
              "
              placeholder="Please explain your request..."
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter className="grid grid-cols-1">
          <Button className="w-full" variant="default" 
            disabled={!isFormValid}
          >
            <SendIcon></SendIcon>
            Send Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const useRequestModalStore = createSelectors(
  create<{
    area: Area
    setArea: (value: Area) => void
    
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    
    open: (area?: Area) => void
  }>()((set) => ({
    area: "",
    setArea: (value) => set({ 
      area: value, 
    }), 
    
    isOpen: false, 
    setIsOpen: (value) => set({ 
      isOpen: value, 
    }), 
    
    open: (area) => set(area ? { 
      area, 
      isOpen: true, 
    } : {
      isOpen: true,
    }), 
  }))
)
