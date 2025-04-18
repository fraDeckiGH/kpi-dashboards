import { Visual as VisualT } from "@/lib/db";
import { BarChart3Icon, GaugeIcon, LineChartIcon, ChartPieIcon, TableIcon } from "lucide-react";

export function getIcon(visual: VisualT, size: number) {
  switch(visual) {
    case 'bar-chart':
      return <BarChart3Icon size={size} />;
    case 'gauge':
      return <GaugeIcon size={size} />;
    case 'line-chart':
      return <LineChartIcon size={size} />;
    case 'pie-chart':
      return <ChartPieIcon size={size} />;
    case 'table':
      return <TableIcon size={size} />;
  }
}

interface Props {
  onSelect: () => void
  recommended: boolean
  selected: boolean
  visual: VisualT
}

export default function Visual({ onSelect, recommended, selected, visual }: Props) {
  
  function getFormattedLabel() {
    const obj: Record<VisualT, string> = {
      'bar-chart': 'Bar Chart',
      'gauge': 'Gauge',
      'line-chart': 'Line Chart',
      'pie-chart': 'Pie Chart',
      'table': 'Table',
    };
    return obj[visual]
  }
  
  return (
    <div 
      className={`p-3 bg-gray-50 rounded-lg border-1
        flex flex-col items-center 
        relative 
        ${selected ? 'border-blue-300' : 'border-gray-50'}
        cursor-pointer
      `}
      onClick={onSelect}
    >
      {recommended && selected ? (
        <span className="absolute -top-2.5 -right-2 bg-gray-200 text-gray-600 text-xs px-3 py-0.5 rounded-full">
          Default
        </span>
      ) : (<>
        {recommended && (
          <span className="absolute -top-2.5 -right-2 bg-gray-200 text-gray-600 text-xs px-3 py-0.5 rounded-full">
            Recommended
          </span>
        )}
        {selected && (
          <span className="absolute -top-2.5 -right-2 bg-blue-400 text-white text-xs px-3 py-0.5 rounded-full">
            Selected
          </span>
        )}
      </>)}
      
      <div className="w-16 h-16 bg-gray-200 rounded mb-2 flex items-center justify-center text-gray-400">
        {getIcon(visual, 24)}
      </div>
      <span className="text-xs text-gray-600">
        {getFormattedLabel()}
      </span>
    </div>
  );
}
