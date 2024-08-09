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
import {
  IoIosArrowBack,
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
  IoIosInfinite,
  IoIosRadioButtonOff,
} from "react-icons/io";
import { CiFilter, CiSettings } from "react-icons/ci";
import { CgMenuLeft } from "react-icons/cg";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { HiOutlinePlus } from "react-icons/hi2";

export const images = {
  logo: "",
  authLogin: "/images/auth-login.png",
  authRegister: "/images/auth-register.png",
  notFound: "/images/404.svg",
  error: "/images/sad.png",
  person: "/images/man.png",
};

export const icons = {
  eye_open: <PiEye />,
  eye_close: <PiEyeClosed />,
  home: <AiOutlineHome />,
  plus: <HiOutlinePlus />,
  tasks: <LuListTodo />,
  account: <MdOutlineManageAccounts />,
  power: <PiPower />,
  paper: <PiPaperPlaneThin />,
  user: <PiUserLight />,
  settings: <CiSettings />,
  search: <IoSearchOutline />,
  close: <IoIosCloseCircleOutline />,
  trash: <PiTrashSimple />,
  pen: <PiPencilSimpleLight />,
  document: <PiNewspaperLight />,
  clock: <PiClockLight />,
  groups: <PiBoundingBoxLight />,
  menu: <CgMenuLeft />,
  check: <IoIosCheckmarkCircleOutline />,
  checkFill: <IoIosCheckmarkCircle />,
  filter: <CiFilter />,
  star: <TiStarOutline />,
  starFill: <TiStarFullOutline />,
  infinity: <IoIosInfinite />,
  circle: <IoIosRadioButtonOff />,
  arrowLeft: <IoIosArrowBack />,
};

export const sidebarMenuLinks = [
  {
    title: "All",
    image: icons.infinity,
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
