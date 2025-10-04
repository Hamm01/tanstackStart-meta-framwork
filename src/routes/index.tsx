import { db } from '@/db'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { EditIcon, ListTodoIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'



const serverLoader = createServerFn({ method: "GET" }).handler(() => {
  return db.query.todos.findMany()
})
export const Route = createFileRoute('/')({
  component: App,
  loader: () => {
    return serverLoader()
  },
})

function App() {
  const todos = Route.useLoaderData()

  const completedCount = todos.filter(t => t.isComplete).length
  const totalCount = todos.length

  return <div className="min-h-screen container space-y-8">
    <div className="flex justify-between items-center gap-4">
      <div className="space-y-2">
        <h1 className='text-4xl font-bold'>Todo List</h1>
        {totalCount > 0 && (
          <Badge variant="outline">
            {completedCount} of {totalCount} completed
          </Badge>
        )}
      </div>
      <div className="flex gap-2">

        <Button size="sm" asChild>
          <Link to="/todos/new">
            <PlusIcon /> Add Todo
          </Link>
        </Button>
      </div>
    </div>
    <TodoListTable todos={todos} />

  </div>

}

function TodoListTable({
  todos,
}: {
  todos: Array<{
    id: string
    name: string
    isComplete: boolean
    createdAt: Date
  }>
}) {
  if (todos.length === 0) {
    return <Empty className="border border-dashed">
      <EmptyHeader >
        <EmptyMedia variant="icon">
          <ListTodoIcon />
        </EmptyMedia>
        <EmptyTitle>No todos</EmptyTitle>
        <EmptyDescription>Try Adding new Todo</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link to="/todos/new">
            <PlusIcon /> Add Todo
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  }

  return <Table>
    <TableHeader>
      <TableRow className='hover:bg-transparent'>
        <TableHead className="w-[100px]">Sr no.</TableHead>
        <TableHead>Task</TableHead>
        <TableHead>Created on</TableHead>
        <TableHead className='w-0'></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {todos.map(todo => (
        <TodoTableRow key={todo.id} {...todo} />
      ))}
    </TableBody>
  </Table>
}

function TodoTableRow({ id, name, isComplete, createdAt }: {
  id: string
  name: string
  isComplete: boolean
  createdAt: Date
}) {
  return <TableRow>
    <TableCell>
      <Checkbox checked={isComplete} />
    </TableCell>
    <TableCell className={cn("font-medium", isComplete && "text-muted-foreground line-through")}>
      {name}
    </TableCell>
    <TableCell className="text-sm text-muted-foreground">
      {formatDate(createdAt)}
    </TableCell>
    <TableCell>
      <div className='flex items-center justify-end gap-1'>
        <Button variant="ghost" size="icon-sm" asChild>
          <Link to="/todos/$id/edit" params={{ id }} >
            <EditIcon />
          </Link>
        </Button>
        <Button variant="destructiveGhost" size="icon-sm" >
          <Trash2Icon />
        </Button>

      </div>
    </TableCell>
  </TableRow>
}

function formatDate(date: Date) {
  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short"
  })
  return formatter.format(date)
}