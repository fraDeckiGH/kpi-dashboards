import React, { useMemo, useState } from 'react'
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
import { CheckIcon, Grid2x2PlusIcon, PackagePlusIcon, SquareIcon, WorkflowIcon } from 'lucide-react'
import KpiAssetCard from '@/lib/kpi/KpiAssetCard'
import { useKpisStore } from '@/lib/kpi/db/store-kpi'
import VisualSimplified from '@/components/visual/VisualSimplified'
import { Kpi } from '@/lib/db'
import { useRequestModalStore } from '@/components/modals/RequestModal'

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch< React.SetStateAction<Props["isOpen"]> >
}

/** use as a base for other modals, never directly */
export default function NewLayoutModal({ isOpen, setIsOpen }: Props) {
  const kpis = useKpisStore.use.kpis()
  const open_requestModal = useRequestModalStore.use.open()
  
  // #region selectedKpis
  const [selectedKpis, setSelectedKpis] = useState< Record<Kpi["id"], Kpi["id"]> >({})
  
  function handleKpiSelection(id: Kpi["id"], value: boolean) {
    setSelectedKpis((prev) => {
      const next = { ...prev }
      if (value) {
        next[id] = id
      } else {
        delete next[id]
      }
      return next
    })
  }
  // #endregion selectedKpis
  
  // #region visual
  const visualsInCommon = useMemo(() => {
    const selectedKpiIds = Object.values(selectedKpis)

    if (selectedKpiIds.length === 0) return []

    const selectedKpisVisuals = selectedKpiIds.map(id => kpis[id].visualsAvailable)
    return (
      selectedKpisVisuals.reduce((common, current) => 
        common.filter(visual => current.includes(visual))
      )
    );
  }, [ kpis, selectedKpis ])
  // #endregion visual
  
  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={() => {
        setIsOpen(false)
        setSelectedKpis({})
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
                bg-gray-100 text-gray-500 
              ">
                <Grid2x2PlusIcon size={32} />
              </div>
              
              <DialogTitle className="text-2xl font-bold">
                New Layout
              </DialogTitle>
              
              <DialogDescription className="">
                Decide what KPIs to track and build a new Layout
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <section className="px-5">
          {/* description */}
          <p className="text-center">
            'Continue building' to set other attributes of the Layout
          </p>
        </section>
        
        <section className="">
          <h3 className="text-lg font-semibold">Visuals in Common</h3>
          <p className="text-muted-foreground text-sm  mt-1 mb-3">
            Visuals available in all the selected KPIs
          </p>
          
          <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg text-gray-600
            min-h-27
          ">
            {Object.values(selectedKpis).length > 0 ? (
              <>
                {visualsInCommon.length > 0 ? (
                  <div 
                    className="
                      grid gap-1.5
                      grid-flow-col
                    "
                    style={{
                      gridAutoColumns: `1fr`, 
                    }}
                  >
                    {visualsInCommon.map((visual) => (
                      <VisualSimplified 
                        key={visual}
                        visual={visual}
                      ></VisualSimplified>
                    ))}
                  </div>
                ) : (
                  <span>
                    No visuals available in common among the selected KPIs
                  </span>
                )}
              </>
            ) : (
              <span>
                No KPIs have been selected for tracking
              </span>
            )}
          </div>
        </section>
        
        <section className="">
          <h3 className="text-lg font-semibold">Trackable KPIs</h3>
          <p className="">
            Select which KPIs to track
          </p>
          <p className="text-muted-foreground text-sm  mt-1 mb-3">
            KPI visuals chosen here will only be used for the new Layout, not globally
          </p>
          
          <div className="flex flex-col gap-1">
            {Object.values(kpis).map((item) => (
              <KpiAssetCard
                key={item.id}
                asset={item}
                cardLike={false}
                selected={!!selectedKpis[item.id]}
                setSelected={handleKpiSelection}
                slotStart={<>
                  <div className="h-full">
                    {!!selectedKpis[item.id] ? 
                      <CheckIcon 
                        className="text-blue-400" 
                        size={18}
                      />
                      : 
                      <SquareIcon 
                        className="text-blue-200" 
                        size={18}
                      />
                    }
                  </div>
                </>}
              ></KpiAssetCard>
            ))}
          </div>
        </section>
        
        <DialogFooter className="mt-3 grid grid-cols-1">
          <Button className="w-full" variant="default">
            <WorkflowIcon></WorkflowIcon>
            Continue building
          </Button>
          <Button className="w-full bg-slate-500" variant="default"
            onClick={() => {
              open_requestModal("Layouts")
            }}
          >
            <PackagePlusIcon />
            Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
