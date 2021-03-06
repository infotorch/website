import React from "react"

import pkg from "../../../../package.json"

const styles = {
  // width: "100%",
  margin: "15px 30px 0px 30px",
  padding: "0 45px 25px 45px",
  textAlign: "center",
}

const ProjectIntro = () => (
  <div class="w-100 block py-4">
    <div class="container mx-auto px-4">
      <div className="flex flex-wrap items-center md:justify-between justify-center">
        <div className="w-full md:w-4/12 px-4">
          <div className="text-sm text-gray-600 font-semibold py-1">
            © {new Date().getFullYear()} v{pkg["version"]} - Data available via{" "}
            <a href="https://github.com/infotorch/covid19-australia-api">API</a>
          </div>
        </div>

        <div className="w-full md:w-8/12 px-4">
          <ul className="flex flex-wrap list-none md:justify-end  justify-center">
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
