import { FormEvent, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LoadingSwap } from "./ui/loading-swap";
import { PlusIcon } from "lucide-react";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import z from 'zod'
import { todos } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

const addTodo = createServerFn({ method: 'POST' }).inputValidator(z.object({ name: z.string().min(1) })).handler(async ({ data }) => {
    await db.insert(todos).values({ ...data, isComplete: false })
    throw redirect({ to: "/" })
})


const updateTodo = createServerFn({ method: 'POST' }).inputValidator(z.object({ id: z.string().min(1), name: z.string().min(1) })).handler(async ({ data }) => {

    await db.update(todos).set(data).where(eq(todos.id, data.id))
    throw redirect({ to: "/" })
})


export function TodoForm({ todo }: {
    todo?: {
        name: string
        id: string
    }
}) {
    const nameRef = useRef<HTMLInputElement>(null)
    const [isloading, setIsLoading] = useState<boolean>(false)
    const addTodoFn = useServerFn(addTodo)
    const updateTodoFn = useServerFn(updateTodo)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const name = nameRef.current?.value
        if (!name) return
        setIsLoading(true)
        if (todo == null) {

            await addTodoFn({ data: { name } })
        } else {
            await updateTodoFn({ data: { name, id: todo.id } })
        }
        setIsLoading(false)

    }
    return <form onSubmit={handleSubmit} className="flex gap-2">
        <Input autoFocus ref={nameRef} placeholder="Enter your new todo..." className="flex-1" aria-label="Name" defaultValue={todo?.name} />
        <Button type="submit" disabled={isloading}>
            <LoadingSwap className="flex gap-2 items-center" isLoading={isloading}>
                {todo == null ? (
                    <>
                        <PlusIcon /> Add
                    </>
                ) : (
                    'Update'
                )}
            </LoadingSwap>
        </Button>
    </form>
}