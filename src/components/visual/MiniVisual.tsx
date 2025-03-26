import { getIcon } from "@/components/visual/Visual";
import { Visual as VisualT } from "@/lib/db/types";
import { CheckIcon, StarIcon } from "lucide-react";

interface Props {
  onSelect: () => void
  recommended: boolean
  selected: boolean
  visual: VisualT
}

export default function MiniVisual({ onSelect, recommended, selected, visual }: Props) {
  return (
    <div 
      className={`p-2 bg-gray-100 rounded-lg border-1
        flex items-center justify-center
        relative 
        ${selected ? 'border-blue-300' : 'border-gray-50'}
        cursor-pointer
      `}
      onClick={onSelect}
    >
      {recommended && (
        <span className="absolute -top-2.5 -right-2 bg-slate-200 text-gray-700 text-xs p-0.75 rounded-full">
          <StarIcon size={12} ></StarIcon>
        </span>
      )}
      {(!recommended && selected) && (
        <span className="absolute -top-1.5 -right-1.5 bg-blue-400 text-white text-xs p-0.5 rounded-full">
          <CheckIcon size={11} ></CheckIcon>
        </span>
      )}
      
      <div className="bg-gray-200 rounded flex items-center justify-center text-gray-400">
        {getIcon(visual, 16)}
      </div>
    </div>
  );
}
