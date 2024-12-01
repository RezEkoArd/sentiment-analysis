import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
  icon: string;
  label: string;
  href: string;
  setLogout?: boolean;
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

const menuItems: MenuGroup[] = [
  {
    title: "Menu",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/admin",
      },
      {
        icon: "/data-latih.png",
        label: "Data Latih",
        href: "/data-latih",
      },
      {
        icon: "/data-uji.png",
        label: "Data Uji",
        href: "/data-uji",
      },
    ],
  },
  {
    title: "Klasifikasi",
    items: [
      {
        icon: "/klasifikasi-svm.png",
        label: "Klasifikasi SVM ",
        href: "/klasifikasi-svm",
      },
      {
        icon: "/klasifikasi-naivebayes.png",
        label: "Klasifikasi NaiveBayes",
        href: "/klasifikasi-naive-bayes",
      },
    ],
  },
  {
    title: "Visualisasi",
    items: [
      {
        icon: "/machine.png",
        label: "SVM ",
        href: "/svm",
      },
      {
        icon: "/naive-bayes.png",
        label: "Naive Bayes",
        href: "/naive-bayes",
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
        setLogout: true,
      },
    ],
  },
];

const Menu = () => {
  const pathname = usePathname();
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="mt-4 ml-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-3">
            {i.title}
          </span>

          {i.items.map((item) => {
            // Validate url
            const isActive = pathname === item.href;

            if (item.setLogout) {
              return (
                 <button
                  key={item.label}
                  onClick={handleLogout}
                  className="flex items-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-slate-200"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                href={item.href}
                key={item.label}
                className={`flex items-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md 
                  ${isActive ? "bg-lightPurple " : "hover:bg-slate-200"}`}
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
