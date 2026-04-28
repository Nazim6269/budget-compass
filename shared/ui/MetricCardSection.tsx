import { MetricCard } from '@/widgets/overview'
import { LucideIcon } from 'lucide-react';
import React from 'react';



export interface MetricSectionProps{
   id:string,
    icon:LucideIcon | undefined
    title:string,
    value:string | number,
    duration:string,
    direction:string
}



const MetricCardSection = ({data}:{data:MetricSectionProps[]}) => {
  return (
    <section className="mb-6 grid grid-cols-1 gap-5  xl:grid-cols-3 ">
        {data.map((item) => (
        <MetricCard
          key={item.id}
          title={item.title}
          value={item.value}
          icon={item.icon}
          trend={{
            value: item.duration,
            direction: item.direction as "up" | "down" | "neutral",
            label: "vs last month",
          }}
        />
        ))}
      </section>
  )
}

export default MetricCardSection