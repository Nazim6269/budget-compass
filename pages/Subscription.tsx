'use client'

import MetricCardSection from '@/shared/ui/MetricCardSection'
import { Calendar, User } from 'lucide-react'
import React from 'react'

const data =[
    {id:"1",
        icon:User,
        title:"Total Revenue",
        value:"$4580",
        duration:"Last year",direction:"up"
    },{
        id:"2",
        icon:Calendar,
        title: "Yearly Plans",
        value:"$2240",
        duration: "+5 week",
        direction:"neutral"
    },
    {
        id:"3",
        icon:Calendar,
        title:"Monthly Plans",
        value:"$1100",
        duration:"-1.2%",
        direction:"down"
    }
]

const Subscription = () => {
  return (
    <div><MetricCardSection data={data}/></div>
  )
}

export default Subscription