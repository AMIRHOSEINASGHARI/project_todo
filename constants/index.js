import { AiOutlineHome, AiOutlinePlusCircle } from "react-icons/ai";
import {
  PiEye,
  PiEyeClosed,
  PiPower,
  PiPaperPlaneThin,
  PiTrashSimple,
  PiNewspaperLight,
  PiPencilSimpleLight,
  PiClockLight,
  PiBoundingBoxLight,
  PiUserLight,
} from "react-icons/pi";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineManageAccounts } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline, IoIosInfinite } from "react-icons/io";
import { CiFilter, CiSettings } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { CgMenuLeft } from "react-icons/cg";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";

export const images = {
  logo: "",
  authLogin: "/images/auth-login.png",
  authRegister: "/images/auth-register.png",
  notFound: "/images/404.svg",
  error: "/images/sad.png",
};

export const icons = {
  eye_open: <PiEye />,
  eye_close: <PiEyeClosed />,
  home: <AiOutlineHome />,
  plus: <AiOutlinePlusCircle />,
  tasks: <LuListTodo />,
  account: <MdOutlineManageAccounts />,
  power: <PiPower />,
  paper: <PiPaperPlaneThin />,
  user: <PiUserLight />,
  settings: <CiSettings />,
  search: <IoSearchOutline />,
  close: <TfiClose />,
  trash: <PiTrashSimple />,
  pen: <PiPencilSimpleLight />,
  document: <PiNewspaperLight />,
  clock: <PiClockLight />,
  groups: <PiBoundingBoxLight />,
  menu: <CgMenuLeft />,
  check: <IoIosCheckmarkCircleOutline />,
  filter: <CiFilter />,
  star: <TiStarOutline />,
  starFill: <TiStarFullOutline />,
  infinity: <IoIosInfinite />,
};

export const sidebarMenuLinks = [
  {
    title: "All",
    image: icons.star,
    link: "/all",
  },
  {
    title: "Important",
    image: icons.star,
    link: "/important",
  },
  {
    title: "Completed",
    image: icons.check,
    link: "/completed",
  },
  {
    title: "Tasks",
    image: icons.tasks,
    link: "/tasks",
  },
  {
    title: "Groups",
    image: icons.groups,
    link: "/groups",
  },
  {
    title: "Settings",
    image: icons.settings,
    link: "/settings",
  },
];
