import React, { useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import apiSummary from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);

  const disPatch = useDispatch();
  // const navigate = useNavigate();

  const [menuDisplay, setMenuDisplay] = useState(false);

  console.log("user header", user);
  const handleLogout = async () => {
    const fetchDetails = await fetch(apiSummary.logout_user.url, {
      method: apiSummary.logout_user.method,

      credentials: "include",
    });

    const data = await fetchDetails.json();

    if (data.success) {
      toast.success(data.message);
      disPatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };
  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here...."
            className="w-full outline-none "
          />

          <div
            className="text-lg min-w-[50px] h-8 btn-color flex items-center justify-center rounded-r-full
          "
          >
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            <div
              className="text-3xl cursor-pointer relative flex justify-center"
              onClick={() => setMenuDisplay((prev) => !prev)}
            >
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-11 h-11 rounded-full object-cover"
                  alt={user?.name}
                />
              ) : (
                <FaRegCircleUser />
              )}
            </div>

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  <Link
                    to={"admin-panel"}
                    className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay((prev) => !prev)}
                  >
                    Admin panel
                  </Link>
                </nav>
              </div>
            )}
          </div>

          <div className="text-2xl relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="btn-color w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">0</p>
            </div>
          </div>

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="p-4 py-2 rounded-full btn-color  hover:opacity-70  "
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="p-4 py-2 rounded-full btn-color  hover:opacity-70 "
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
