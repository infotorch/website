import React from "react"
import classnames from "classnames"

const tableContainerClasses = {
  block: true,
  "w-full": true,
  "overflow-x-auto": true,
}

const tableClasses = {
  "items-center": true,
  "w-full": true,
  "bg-transparent": true,
  "border-collapse": true,
}

const tableHeaderClasses = {
  "thead-light": true,
}

const tableRowClasses = {}

const tableHeaderRowClasses = {
  "px-6": true,
  "bg-gray-100": true,
  "text-gray-600": true,
  "align-middle": true,
  border: true,
  "border-solid": true,
  "border-gray-200": true,
  "py-3": true,
  "text-xs": true,
  uppercase: true,
  "border-l-0": true,
  "border-r-0": true,
  "whitespace-no-wrap": true,
  "font-semibold": true,
  "text-left": true,
}

const tableCellClasses = {
  "border-t-0": true,
  "px-2": true,
  "align-middle": true,
  "border-l-0": true,
  "border-r-0": true,
  "text-xs": true,
  "whitespace-no-wrap": true,
  "p-4": true,
  "phone:p-1": true,
}

export const TableContainer = ({ children, className }) => {
  return (
    <div className={classnames(tableContainerClasses, className)}>
      {children}
    </div>
  )
}

export const Table = ({ children, className }) => (
  <table className={classnames(tableClasses, className)}>{children}</table>
)

export const TableHeader = ({ children, className }) => (
  <thead className={classnames(tableHeaderClasses, className)}>
    {children}
  </thead>
)

export const TableBody = ({ children, className }) => {
  return <tbody className={classnames(className)}>{children}</tbody>
}

export const TableRow = ({ children, className }) => (
  <tr className={classnames(tableRowClasses, className)}>{children}</tr>
)

export const TableHeaderCell = ({ children, className, ...rest }) => (
  <th className={classnames(tableHeaderRowClasses, className)} {...rest}>
    {children}
  </th>
)

export const TableCell = ({ children, className, component, ...rest }) => {
  const el = component ? component : "td"

  return React.createElement(el, {
    className: classnames(tableCellClasses, className),
    children,
    ...rest,
  })
}
