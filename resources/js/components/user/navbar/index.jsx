import React from "react";
import Dropdown from "@/components/admin/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import {Link, NavLink} from "react-router-dom";
import { BsArrowBarUp } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import {
    IoMdNotificationsOutline, IoMdPeople, IoMdPerson,
} from "react-icons/io";
import ExampleAvatar from "@/assets/images/avatars/avatar.png";
import {useDispatch, useSelector} from "react-redux";
import {logOut, selectCurrentUser} from "@/store/auth/authSlice";
import {useLogoutMutation} from "@/store/api/auth/authApiSlice";

const UserNavbar = (props) => {
  const dispatch =
      useDispatch()
  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = React.useState(false)

  const user = useSelector(selectCurrentUser)
  const [logout,{isLoading}] = useLogoutMutation()

    async function handleLogoutAttempt(values, actions) {
        try {
            const response = await logout({}).unwrap()
            dispatch(logOut())
        } catch(error) {
            dispatch(logOut())
        }
    }


    return (
    <nav className="sticky top-4 z-50 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Pages
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-xl bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        <div className="flex h-full items-center rounded-xl bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
          />
        </div>
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>
        {/* Profile & Dropdown */}
          {user &&
        <Dropdown
          button={
            <div className={"flex gap-x-1 justify-center items-center"}>
                <IoMdPerson className="h-4 w-4 text-gray-600 dark:text-white text-center" />
              <h5 className="text-sm font-bold text-navy-700 text-left dark:text-white mr-2 cursor-pointer">
                  {user?.first_name}
              </h5>
            </div>
          }
          children={
            <div className="flex h-32 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="mt-3 ml-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                      👋 Merhaba, {user?.first_name}
                  </p>
                </div>
              </div>
              <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="mt-3 ml-4 flex flex-col">
                <NavLink to={"profile"} className="text-sm text-gray-800 dark:text-white hover:dark:text-white">
                  Profil Ayarları
                </NavLink>
                <button onClick={handleLogoutAttempt} className="text-left mt-3 text-sm font-medium text-red-500 hover:text-red-500">
                  Çıkış Yap
                </button>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
          }
          {!user && <NavLink to={"auth/register"} className="linear flex items-center text-sm justify-center  px-1 py-1 text-base font-medium text-blue-800 transition duration-200  dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
              Login
          </NavLink>
          }
      </div>
    </nav>
  );
};

export default UserNavbar;
