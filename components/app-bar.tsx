import { MainNav } from "@/components/main-nav";

export function AppBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60">
      <div className="container flex max-w-screen-2xl items-center">
        <MainNav />
      </div>
    </header>
  )
}
