import { TodoForm } from '@/components/todo-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'


export const Route = createFileRoute('/todos/$id/edit/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="container space-y-2">
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
                <Link to="/"><ArrowLeftIcon />Todo List</Link>
            </Button>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Todo</CardTitle>
                    <CardDescription>Update the details of your todo item</CardDescription>
                </CardHeader>
                <CardContent>
                    <TodoForm />
                </CardContent>
            </Card>
        </div>
    )
}
