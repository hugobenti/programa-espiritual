'use client'

import * as React from 'react'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type DialogContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextValue | null>(null)

function Dialog({ open, onOpenChange, children }: { open?: boolean; onOpenChange?: (open: boolean) => void; children: React.ReactNode }) {
  const [internalOpen, setInternalOpen] = React.useState<boolean>(!!open)
  const effectiveOpen = open !== undefined ? open : internalOpen
  const setOpen = (v: boolean) => {
    if (onOpenChange) onOpenChange(v)
    if (open === undefined) setInternalOpen(v)
  }
  return (
    <DialogContext.Provider value={{ open: effectiveOpen, setOpen }}>
      <div data-slot="dialog">{children}</div>
    </DialogContext.Provider>
  )
}

function DialogTrigger({ children, asChild, ...props }: { children: React.ReactNode; asChild?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = React.useContext(DialogContext)!
  const handleClick = (e: React.MouseEvent<any>) => {
    ctx.setOpen(true)
    props.onClick?.(e)
  }
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>
    const mergedOnClick = (e: React.MouseEvent<any>) => {
      child.props?.onClick?.(e)
      handleClick(e)
    }
    return React.cloneElement(child, { onClick: mergedOnClick })
  }
  return (
    <button data-slot="dialog-trigger" {...props} onClick={handleClick}>
      {children}
    </button>
  )
}

function DialogPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function DialogClose({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }) {
  const ctx = React.useContext(DialogContext)!
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    ctx.setOpen(false)
    props.onClick?.(e)
  }
  return (
    <button data-slot="dialog-close" {...props} onClick={handleClick}>
      {children}
    </button>
  )
}

function DialogOverlay({ className, ...props }: React.ComponentProps<'div'>) {
  const ctx = React.useContext(DialogContext)!
  if (!ctx.open) return null
  return (
    <div
      data-slot="dialog-overlay"
      className={cn('absolute top-0 left-0 w-screen h-screen inset-0 z-50 bg-black/50', className)}
      onClick={() => ctx.setOpen(false)}
      {...props}
    />
  )
}

function DialogContent({ className, children, showCloseButton = true, ...props }: { className?: string; children?: React.ReactNode; showCloseButton?: boolean } & React.ComponentProps<'div'>) {
  const ctx = React.useContext(DialogContext)!
  if (!ctx.open) return null
  return (
    <DialogPortal>
      <DialogOverlay />
      <div
        data-slot="dialog-content"
        className={cn(
          'bg-background fixed top-[10%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className,
        )}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.stopPropagation()
            ctx.setOpen(false)
          }
        }}
        {...props}
      >
        {children}
        {showCloseButton && (
          <button
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"
            onClick={() => ctx.setOpen(false)}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-title"
      className={cn('text-lg leading-none font-semibold', className)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-description"
      className={cn('text-muted-foreground text-md', className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
