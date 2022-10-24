function Navbar() {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const username = localStorage.getItem("username");

  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-1 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <button
          className="navbar-toggler text-gray-200 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="bars"
            className="w-6"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            {/* <path
              fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            ></path> */}
          </svg>
        </button>
        <div
          className="collapse navbar-collapse flex flex-grow items-center"
          id="navbarSupportedContent1"
        >
          <a className="text-2xl text-white pr-12 font-semibold" href="/">
            <img src={`${baseURL}/logo.png`} alt="bundling" className="w-16" />
          </a>
          <ul className="navbar-nav flex flex-row pl-0 list-style-none mr-auto">
            <li className="nav-item p-2">
              <a className="nav-link text-white" href="/recomendations">
                Recomendations
              </a>
            </li>
            <li className="nav-item p-2">
              <a
                className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                href="/transaction"
              >
                Transactions
              </a>
            </li>
            <li className="nav-item p-2">
              <a
                className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                href="/product"
              >
                Product
              </a>
            </li>
          </ul>
        </div>
        {!username ? (
          <div>
            <a href="/login" className="text-blue-500 font-semibold text-xl">
              LOGIN
            </a>
          </div>
        ) : (
          <div className="flex items-center relative">
            <a
              className="text-white opacity-60 hover:opacity-80 focus:opacity-80 mr-4"
              href="/history"
            >
              History
            </a>
            <div className="dropdown relative">
              <a
                className="dropdown-toggle flex items-center hidden-arrow"
                href="/"
                id="dropdownMenuButton2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={`${baseURL}/user-profile.png`}
                  className="rounded-full h-10 w-10 object-cover"
                  // style="height: 25px; width: 25px"
                  alt=""
                  loading="lazy"
                />
              </a>
              <ul
                className="dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
                aria-labelledby="dropdownMenuButton2"
              >
                <li>
                  <a
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    href="/"
                  >
                    Action
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    href="/"
                  >
                    Another action
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    href="/"
                  >
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
