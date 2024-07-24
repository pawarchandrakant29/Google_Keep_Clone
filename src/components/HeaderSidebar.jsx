import React, { useState } from 'react';

function HeaderSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header>
        <nav className="nav-container">
          <div className="nav-wrapper">
            <div className="col-2 d-flex">
              <p className="m-0 text-black" onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
                <i className="bi bi-list fs-3 ms-3 me-2"></i>
              </p>
              <a className="logo d-flex align-items-center" href="#!">
                <img
                  src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
                  className="img-set"
                  alt="Keep"
                />
                <p className="m-0 text-grey">Keep</p>
              </a>
            </div>
            <div className="col-7">
              <div className="search-container">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  name="search"
                  className="search-box"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="d-flex justify-content-end col">
              <ul className="items m-0 d-flex align-items-center">
                <li>
                  <a href="#replay">
                    <i className="bi bi-arrow-clockwise"></i>
                  </a>
                </li>
                <li>
                  <a href="#view">
                    <i className="bi bi-list-ul"></i>
                  </a>
                </li>
                <li>
                  <a href="#apps">
                    <i className="bi bi-gear"></i>
                  </a>
                </li>
                <li>
                  <a href="#notifications" className="ms-3">
                    <i className="bi bi-grid-3x3-gap-fill"></i>
                  </a>
                </li>
                <li>
                  <a href="#login">
                    <img src="https://firebasestorage.googleapis.com/v0/b/contacts-e5a08.appspot.com/o/avatars%2Fme.png?alt=media&token=18ab088f-5d46-4507-9288-a2b125c3dc61" className="img-set2" alt="User"/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <ul>
          <li className="p-0 mt-4 me-3 text-size">
            <a href="#notes" className="active ps-3">
              <i className="bi bi-lightbulb"></i> Notes
            </a>
          </li>
          <li className="p-0 text-size">
            <a href="#reminders" className="ps-3 side-a">
              <i className="bi bi-bell"></i> Reminders
            </a>
          </li>
          <li className="p-0 text-size">
            <a href="#edit-labels" className="ps-3 side-a">
              <i className="bi bi-pencil"></i> Edit Labels
            </a>
          </li>
          <li className="p-0 text-size">
            <a href="#archive" className="ps-3 side-a">
              <i className="bi bi-archive"></i> Archive
            </a>
          </li>
          <li className="p-0 text-size">
            <a href="#trash" className="ps-3 side-a">
              <i className="bi bi-trash"></i> Trash
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default HeaderSidebar;
