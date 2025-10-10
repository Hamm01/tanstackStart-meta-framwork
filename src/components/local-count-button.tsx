import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { createClientOnlyFn } from "@tanstack/react-start";
import { ClientOnly } from "@tanstack/react-router";


export function LocalCountButton() {


    return <ClientOnly fallback="stater">
        <ClientSideSection />
    </ClientOnly>
}

//added the localcount button to show client side fn 
// , to use clientonly that localstorage part will run on clientside , not give an error
// becuase whole code above without clientonly will run server side so that can throw errors, 
function ClientSideSection() {

    const [count, setCount] = useState(loadCount)

    useEffect(() => {

        localStorage.setItem("count", count.toString())
    }, [count])
    return <Button variant="outline" size="sm" onClick={() => setCount(count => count + 1)}>{count}</Button>
}

const loadCount = createClientOnlyFn(() => {
    const stroredCount = localStorage.getItem("count")
    return stroredCount ? parseInt(stroredCount) : 0
})