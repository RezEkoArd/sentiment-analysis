import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "Menu",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
      },
    ],
  },
  {
    title: "Visualisasi",
    items: [
      {
        icon: "/machine.png",
        label: "SVM ",
        href: "/",
      },
      {
        icon: "/naive-bayes.png",
        label: "Naive Bayes",
        href: "/",
      },
    ],
  },
  {
    title: "Other",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 ml-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-3">
            {i.title}
          </span>

          {i.items.map((item) => {
            return (
              <Link
                href={item.href}
                key={item.label}
                className="flex items-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-slate-200"
              >
                <Image src={item.icon} alt="" width={20} height={20} />
                <span className="hidden lg:block">{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
