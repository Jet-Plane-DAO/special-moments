import React from 'react'
import Layout from '../Layout'
import { LoadingState } from './LoadingState'

export default function LoadingFullLayout() {
    return (
        <div className="w-full h-screen bg-gray-10  bg-teds bg-bottom ">
            <Layout title="Connecting Wallet">
                <div className="flex justify-center items-center">
                    <LoadingState />
                </div>
            </Layout>
        </div>
    )
}
