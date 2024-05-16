import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";
import Container from "../container/Container";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItem = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    // {
    //   name: "Logout",
    //   slug: "/logout",
    //   active: authStatus,
    // },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All posts",
      slug: "/all-posts",
      // active: authStatus,
    },
    {
      name: "Add post",
      slug: "/add-post",
      // active: authStatus,
    },
  ];
  return (
    <div>
      <header className="py-3 shadow bg-gray-500">
        <Container>
          <nav className="flex">
            <div className="mr-4">
              <Link to="/">
                <Logo />
              </Link>
            </div>
            <ul className="flex ml-auto">
              {navItem.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      className="inline-block px-6 py-2 duration-200 rounded-full hover:bg-blue-100"
                      onClick={() => {
                        console.log("item.slug====",item.slug)
                        navigate(item.slug);
                      }}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
    </div>
  );
};

export default Header;
