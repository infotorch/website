import React from "react"

export const BoxTitle = ({ heading }) => (
  <div className="rounded-t mb-0 px-4 py-3 border-0">
    <div className="flex flex-wrap items-center">
      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
        <h3 className="font-semibold text-base text-gray-800">{heading}</h3>
      </div>
    </div>
  </div>
)
