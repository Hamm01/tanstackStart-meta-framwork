import { db } from '@/db'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/')({
  component: App,
  loader: () => {
    return db.query.todos.findMany()
  },
})

function App() {
  const todos = Route.useLoaderData()

  return <h1>hi {JSON.stringify(todos[0].name.trim(), null, 2)}</h1>

}
