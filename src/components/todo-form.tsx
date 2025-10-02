import { FormEvent, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LoadingSwap } from "./ui/loading-swap";
import { PlusIcon } from "lucide-react";
import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import z from 'zod'
import { todos } from "@/db/schema";
import { db } from "@/db";

const addTodo = createServerFn({ method: 'POST' }).inputValidator(z.object({ name: z.string().min(1) })).handler(({ data }) => {
    db.insert(todos).values({ ...data, isComplete: false })
    redirect({ to: "/" })
})



export function TodoForm() {
    const nameRef = useRef<HTMLInputElement>(null)
    const [isloading, setIsLoading] = useState<boolean>(false)

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

    }
    return <form onSubmit={handleSubmit} className="flex gap-2">
        <Input autoFocus ref={nameRef} placeholder="Enter your new todo..." className="flex-1" aria-label="Name" />
        <Button type="submit" disabled={isloading}>
            <LoadingSwap className="flex gap-2 items-center" isLoading={isloading}><PlusIcon /> Add</LoadingSwap>
        </Button>
    </form>
}