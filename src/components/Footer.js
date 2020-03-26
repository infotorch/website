import React from "react"
import pkg from "../../package.json"

const ProjectIntro = () => (
  <div class="w-full block mb-8 mt-4 py-4">
    <div class="px-4 mx-auto">
      <div className="flex flex-wrap">
        <div className="w-1/2 px-4">
          <div className="font-mono font-small">v{pkg["version"]}</div>
        </div>

        <div className="w-1/2 px-4">
          <ul className="flex flex-wrap list-none justify-end">
            <li>
              <a
                href="mailto:hello@infotorch.org"
                className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href="https://github.com/infotorch"
                className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
              >
                Code
              </a>
            </li>
            <li>
              <a
                href="https://github.com/infotorch/covid19-australia-api"
                className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
              >
                API
              </a>
            </li>
            <li>
              <a
                href="http://twitter.com/infotorchorg"
                className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="http://twitter.com/infotorchorg"
                className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)

export default ProjectIntro
