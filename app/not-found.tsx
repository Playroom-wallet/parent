import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <div className="rounded-full bg-pink-100 p-3 mb-4">
        <span className="text-3xl">🐣</span>
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-center">Page not found</h1>
      <p className="mt-2 text-center text-muted-foreground">Sorry, we couldn't find the page you're looking for.</p>
      <Button asChild className="mt-6">
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  )
}

