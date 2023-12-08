import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarItemLink } from "@/constants/sidebarData";
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import Sublink from "./sublink";

type SidebarItemProps = {
  item: SidebarItemLink;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};

export default function SidebarItem({
  item,
  selected,
  setSelected,
}: SidebarItemProps) {
  const handleClick = (id: number) => {
    if (selected === item.id) {
      setSelected(0);
    } else {
      setSelected(id);
    }
  };
  const isActive = selected === item.id;

  if (item.sublink) {
    return (
      <div
        className={`"text-md block border-l-4 border-gray-300"  ${
          isActive
            ? "border-l-[3px] border-blue-600 shadow-blue-200 shadow-sm pb-3"
            : ""
        }`}
      >
        <div
          onClick={() => handleClick(item.id)}
          className="flex flex-row items-center hover:bg-blue-200 pr-2"
        >
          <div className="flex flex-row items-start gap-3 w-full h-[40px] px-4 py-2 ">
            {item.icon && (
              <item.icon
                data-feather={item.icon}
                strokeWidth={1.5}
                size={20}
              ></item.icon>
            )}
            <span
              className={` ${
                isActive
                  ? " text-black font-medium uppercase tracking-wider "
                  : "text-gray-800  font-light tracking-wider"
              }`}
            >
              {item.label}
            </span>
          </div>
          <FontAwesomeIcon
            className={`" text-gray-600 cursor-pointer justify-self-end self-end" `}
            icon={isActive ? faChevronDown : faChevronRight}
            width={16}
            height={16}
            fontSize={14}
          />
        </div>
        <div
          className={`"sidebar-content text-black " ${
            isActive === false ? "h-0 overflow-hidden" : "h-auto -translate-y-1"
          }`}
        >
          <Sublink sublink={item.sublink}></Sublink>
        </div>
      </div>
    );
  } else {
    return (
      <li
        className={
          "sidebar-item p-4 text-sm text block border-b-2 border-white hover:bg-white/5 w-[260px] "
        }
      >
        <div className="sidebar-title flex content-between">
          <span>
            {item.icon && (
              <item.icon
                data-feather={item.icon}
                className="text-gray-800 text-base"
              ></item.icon>
            )}

            {item.label}
          </span>
        </div>
      </li>
    );
  }
}
