import React, { useEffect, useState } from 'react'
import axiosInstance from '../../Config/axiosInstance'
import { CalendarDays, Layers } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function Event() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetchEvents()
        scrollToTop()
    }, [])

    function scrollToTop() {
        window.scroll(0, 0)
    }

    function fetchEvents() {
        axiosInstance({
            method: 'GET',
            url: '/event'
        })
            .then((res) => {
                console.log('res :>> ', res);
                setEvents(res?.data?.data)
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
    }

    function formatTime(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 === 0 ? 12 : hours % 12;
        return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6">
            <h1 className="mb-8 text-3xl sm:text-4xl font-bold text-center">
                Events
            </h1>

            {events?.length === 0 && (
                <div className="flex justify-center items-center h-48">
                    <span className="loading loading-spinner text-primary w-10 h-10" />
                </div>
            )}
            
            <div className="grid sm:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8">
                {events?.map((item) => (
                    <div
                        key={item?.id}
                        className="group relative backdrop-blur-md bg-white/50 border border-gray-200/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden"
                    >
                        {/* Top Color Block */}
                        <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-32 flex items-center justify-center">
                            <div className="text-white text-center">
                                <div className="text-3xl font-extrabold">
                                    {new Date(item?.date).getDate()}
                                </div>
                                <div className="uppercase text-sm tracking-wide -mt-1">
                                    {new Date(item?.date).toLocaleString('default', { month: 'short' })}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-3">
                            <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full capitalize">
                                {item?.type}
                            </span>

                            <h2 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-700 transition">
                                {item?.title}
                            </h2>

                            <p className="text-sm flex items-center text-gray-600">
                                {formatTime(item?.time)}
                            </p>
                        </div>

                        {/* Button */}
                        <Link
                            to={`/event/${item?.id}`}
                            className="block w-full py-3 text-center font-semibold text-white bg-blue-600 hover:bg-blue-700 transition rounded-b-2xl"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
