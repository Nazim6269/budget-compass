'use client'

import MetricCardSection from '@/shared/ui/MetricCardSection'
import {  SubscriptionTabs } from '@/widgets/subscription/ui/Subscription'
import TabsSkeleton from '@/widgets/subscription/ui/TabSkeleton'
import { Calendar, User } from 'lucide-react'
import React, { Suspense } from 'react'

const data = [
    {
        id: "1",
        icon: User,
        title: "Total Revenue",
        value: "$4580",
        duration: "Last year", direction: "up"
    }, {
        id: "2",
        icon: Calendar,
        title: "Yearly Plans",
        value: "$2240",
        duration: "+5 week",
        direction: "neutral"
    },
    {
        id: "3",
        icon: Calendar,
        title: "Monthly Plans",
        value: "$1100",
        duration: "-1.2%",
        direction: "down"
    }
]

const Subscription = () => {
    return (
        <div>
            <MetricCardSection data={data} />
            <Suspense fallback={<TabsSkeleton />}>
                <SubscriptionTabs />
            </Suspense>
        </div>
    )
}

export default Subscription