'use client'

import * as React from 'react'
type TabsContextValue = {
  value: string
  setValue: (v: string) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

import { cn } from '@/lib/utils'

function Tabs({ className, value, onValueChange, defaultValue, children }: { className?: string; value?: string; defaultValue?: string; onValueChange?: (v: string) => void; children?: React.ReactNode }) {
  const [internal, setInternal] = React.useState<string>(defaultValue ?? '')
  const current = value !== undefined ? value : internal
  const setValue = (v: string) => {
    onValueChange?.(v)
    if (value === undefined) setInternal(v)
  }
  return (
    <TabsContext.Provider value={{ value: current, setValue }}>
      <div data-slot="tabs" className={cn('flex flex-col gap-2', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

function TabsList({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="tabs-list"
      className={cn(
        'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
        className,
      )}
      {...props}
    />
  )
}

function TabsTrigger({ className, value, children, ...props }: { className?: string; value: string; children?: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = React.useContext(TabsContext)!
  const active = ctx.value === value
  return (
    <button
      data-slot="tabs-trigger"
      data-state={active ? 'active' : 'inactive'}
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      onClick={() => ctx.setValue(value)}
      {...props}
    >
      {children}
    </button>
  )
}

function TabsContent({ className, value, children, ...props }: { className?: string; value: string; children?: React.ReactNode } & React.ComponentProps<'div'>) {
  const ctx = React.useContext(TabsContext)!
  if (ctx.value !== value) return null
  return (
    <div data-slot="tabs-content" className={cn('flex-1 outline-none', className)} {...props}>
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
