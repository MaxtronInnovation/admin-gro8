"use client"
import ApprovalStatus from '@/components/global/ApprovalStatus'
import DealsListTabs from '@/components/global/DealsListTabs'
import StartUpProfile from '@/components/global/StartUpProfile'
import StartUpTimeLine from '@/components/global/StartUpTimeLine'
import { useState } from 'react'

const Page = () => {
    const [approvalStatus, setApprovalStatus] = useState<string>("pending");
    return (
        <div className='w-full grid grid-cols-12 gap-x-5 mt-[12px] '>
            <div className='col-span-8 w-full flex flex-col items-start justify-start gap-[29px]'>
                <StartUpProfile />
                <DealsListTabs />
            </div>
            <div className='col-span-4 w-full flex flex-col items-start justify-start gap-y-[13.5px]'>
                <ApprovalStatus approvalStatus={approvalStatus} setApprovalStatus={setApprovalStatus} />
                <StartUpTimeLine />

            </div>

        </div>
    )
}

export default Page
