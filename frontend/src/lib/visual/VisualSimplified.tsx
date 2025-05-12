import { getIcon } from "@/lib/visual/Visual";
import { Visual } from "@/lib/db";

interface Props {
  visual: Visual
}

export default function VisualSimplified({ visual }: Props) {
  
  function getFormattedLabel() {
    const obj: Record<Visual, string> = {
      'bar-chart': 'Bar Chart',
      'gauge': 'Gauge',
      'line-chart': 'Line Chart',
      'pie-chart': 'Pie Chart',
      'table': 'Table',
    };
    return obj[visual]
  }
  
  return (
    // border-1
    <div 
      className={`py-2 px-3 pb-1 bg-gray-50 rounded-lg 
        flex flex-col items-center 
      `}
    >
      <div className="p-3 bg-gray-200 rounded mb-2 flex items-center justify-center text-gray-400">
        {getIcon(visual, 24)}
      </div>
      <span className="text-xs text-gray-600">
        {getFormattedLabel()}
      </span>
    </div>
  );
}
