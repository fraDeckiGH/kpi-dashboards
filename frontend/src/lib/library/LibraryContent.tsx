import { useState } from 'react'
import { SearchBar } from '@/lib/search/SearchBar'
import AssetTabs from '@/lib/asset/tabs/AssetTabs'
import NewLayoutModal from '@/lib/layout/modals/NewLayoutModal'
import { Button } from '@/components/ui/button'
import { Grid2x2PlusIcon, PackagePlusIcon } from 'lucide-react'
import RequestModal, { useRequestModalStore } from '@/lib/request/RequestModal'

export default function LibraryContent() {
  const open_requestModal = useRequestModalStore.use.open()
  const [isOpen_newLayoutModal, setIsOpen_newLayoutModal] = useState(false)
  
  return (<>
    <div className="
        flex flex-col 
        @container
      "
    >
      <div className="
        absolute top-4 right-4
        flex flex-col 
        gap-1 @2xl:gap-2
      ">
        <Button className=" bg-slate-500 py-5"
          onClick={() => open_requestModal()}
          size="lg"
          variant="default"
        >
          <PackagePlusIcon />
          <span className="hidden @2xl:inline">
            Request
          </span>
        </Button>
        <Button className="py-5"
          onClick={() => setIsOpen_newLayoutModal(true)}
          size="lg"
          variant="default"
        >
          <Grid2x2PlusIcon />
          <span className="hidden @2xl:inline">
            New Layout
          </span>
        </Button>
      </div>
      
      <div className="text-center">
        <h1 className="text-4xl font-bold  mb-6">
          Library
        </h1>
        <p>
          Browse for assets needed to report and present analysis.
        </p>
      </div>
      <div className="h-6"></div>
      
      <SearchBar />
      <AssetTabs></AssetTabs>
    </div>
    
    {/* dialogs/modals */}
    <NewLayoutModal 
      isOpen={isOpen_newLayoutModal}
      setIsOpen={setIsOpen_newLayoutModal}
    ></NewLayoutModal>
    <RequestModal></RequestModal>
  </>);
}