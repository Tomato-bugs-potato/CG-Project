import React from "react";
import { Card, Button } from "flowbite-react";

export default function ItemDetails({details}) {
    return (
        <Card className="max-w-sm">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{details.Name}</h1>
            <p className="font-normal text-gray-700 dark:text-gray-400">{details.price}</p>
            <Button>Add to cart</Button>
        </Card>
    );
}
