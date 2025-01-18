import React from "react";
import { Html } from "@react-three/drei";
import { Button, Spinner } from "flowbite-react";

export default function LodingItemCard({position}) {
    return (
        <Html position={position} scale={0.5} transform occlude>
            <div role="status" class="space-y-2 animate-pulse">
                <div class="flex items-center justify-center w-full h-52 bg-gray-300 rounded">
                    <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M16 18H8l2.5-6 2 4 1.5-2 2 4Zm-1-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/>
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM8 18h8l-2-4-1.5 2-2-4L8 18Zm7-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/>
                    </svg>
                </div>
                <div class="h-3.5 bg-gray-300 rounded-full dark:bg-gray-700 w-32 mb-4"></div>
                <div class="h-3.5 bg-gray-300 rounded-full dark:bg-gray-700 w-20 mb-4"></div>
                <Button className="w-60" disabled>
                    <Spinner aria-label="Spinner button example" size="sm" />
                    <span>Loading...</span>
                </Button>
            </div>
        </Html>
    );
}
