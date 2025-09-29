import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/todos/new/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello new todo!</div>
}
