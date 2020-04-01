import React from "react"
import numeral from "numeral"

import { FaArrowDown } from "react-icons/fa"
import { FaArrowUp } from "react-icons/fa"

export const Box = props => {
  let classes = "sm:w-full phone:w-1/2 tablet:w-1/2 desktop:w-1/4 phone:px-2 "

  if (props.large) {
    classes = "phone:w-full tablet:w-1/2 desktop:w-1/2 px-4 overflow-x-hidden"
  }

  if (props.small) {
    classes = "phone:w-1/3 tablet:w-1/4 desktop:w-1/6 px-4"
  }

  if (props.class) {
    classes += props.class
  }

  return (
    <div className={classes} {...props}>
      {props.children}
    </div>
  )
}

export const BoxShadow = props => (
  <Box large={props.large}>
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 py-3 border-0 full-y" {...props}>
        {props.children}
      </div>
    </div>
  </Box>
)

export const BoxTitle = ({ heading }) => (
  <div className="rounded-t mb-0 px-4 py-3 border-0">
    <div className="flex flex-wrap items-center">
      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
        <h3 className="font-semibold text-base text-gray-800">{heading}</h3>
      </div>
    </div>
  </div>
)

export const BoxStat = ({ title, stat, change }) => {
  let delta = 0

  if (change) {
    delta = stat - change
  }

  return (
    <Box>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6  xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-gray-600 uppercase mb-4 font-bold text">
                {title}
              </h5>
              <span className="font-semibold text-3xl text-gray-800">
                {numeral(stat).format("0,0")}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                <FaArrowUp className="w-20 h-20" />
              </div>
            </div>
          </div>
          {delta ? (
            <p className="text-sm text-gray-500 mt-4">
              <span className="text-green-500 mr-2">
                <i className="fas fa-arrow-up"></i>{" "}
                {numeral(delta).format("0,0")}
              </span>
              <span className="whitespace-no-wrap"> last 24 hours</span>
            </p>
          ) : (
            undefined
          )}
        </div>
      </div>
    </Box>
  )
}
