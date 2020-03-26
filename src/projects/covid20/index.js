import React from "react"
import { IoMdAlert } from "react-icons/io"

const CovidApp = () => {
  const error = undefined

  return (
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        {error && (
          <div class="shadow mb-4" role="alert">
            <div class="flex">
              <div class="bg-red-500 w-16 text-center p-2">
                <div class="flex justify-center h-full items-center">
                  <IoMdAlert className="text-white" />
                </div>
              </div>
              <div class="bg-white border-r-4 border-red-500 w-full p-4">
                <div>
                  <p class="text-grey-dark font-bold">Error</p>
                  <p class="text-grey-dark">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div class="max-w-md mx-auto flex p-6 bg-white text-center rounded-lg shadow-xl">
          <h1>I am the COVIC-19</h1>
        </div>
        <div class="max-w-md mx-auto flex p-6 bg-white text-center rounded-lg shadow-xl">
          <h1>I am the COVIC-19</h1>
        </div>
        <div class="max-w-md mx-auto flex p-6 bg-white text-center rounded-lg shadow-xl">
          <h1>I am the COVIC-19</h1>
        </div>
        <div class="max-w-md mx-auto flex p-6 bg-white text-center rounded-lg shadow-xl">
          <h1>I am the COVIC-19</h1>
        </div>
      </div>
    </div>
  )
}

export default CovidApp
