"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      closeButton
      duration={3500}
      offset={80} // Push below header
      icons={{
        success: <CircleCheckIcon className="size-5 text-[#16a34a]" />,
        info: <InfoIcon className="size-5 text-blue-500" />,
        warning: <TriangleAlertIcon className="size-5 text-amber-500" />,
        error: <OctagonXIcon className="size-5 text-red-500" />,
        loading: <Loader2Icon className="size-5 text-gray-500 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border group-[.toaster]:border-gray-100 group-[.toaster]:shadow-xl group-[.toaster]:shadow-black/5 group-[.toaster]:rounded-xl font-sans",
          description: "group-[.toast]:text-gray-500 group-[.toast]:text-[13px] font-medium",
          title: "group-[.toast]:text-[14px] font-bold tracking-tight",
          actionButton:
            "group-[.toast]:bg-[#16a34a] group-[.toast]:text-white group-[.toast]:font-semibold group-[.toast]:rounded-md",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-600",
          closeButton:
            "group-[.toast]:bg-white group-[.toast]:text-gray-400 group-[.toast]:border-gray-100 hover:group-[.toast]:text-gray-900 hover:group-[.toast]:bg-gray-50 transition-colors shadow-sm",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
