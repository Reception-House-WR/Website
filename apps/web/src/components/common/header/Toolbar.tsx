import Logo from "./Logo";
import Search from "./Search";
import LanguageToggle from "./LanguageToggle";
import { MenuDesktop, MenuMobile } from "./Menu";
import { SearchSection } from "@/lib/search/types";
import { StrapiLocale } from "@/lib/strapi/helpers/localesHelper";
import { NavItem } from "@/lib/strapi/helpers/navHelper";

type ToolbarProps = {
  currentLocale: string;
  items: SearchSection[];
  locales: StrapiLocale[];
  nav: NavItem[];
};

export const Toolbar = ({ currentLocale, items, locales, nav }: ToolbarProps) => {
  return (
    <header className="sticky top-0 z-50 w-full  border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 sm:hidden">
          <div className="flex items-center gap-2 shrink-0">
            <MenuMobile nav={nav} />
            <div className="shrink-0">
              <Logo />
            </div>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2 shrink-0">
            <Search items={items} />
            <LanguageToggle
              locales={locales}
              currentLocale={currentLocale}
            />
          </div>
        </div>

        <div className="hidden sm:flex h-16 items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="block lg:hidden">
              <MenuMobile nav={nav} />
            </div>

            <Logo />

            <div className="hidden lg:block">
              <MenuDesktop nav={nav} />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <div className="flex-1 min-w-0">
              <Search items={items} />
            </div>
            <LanguageToggle
              locales={locales}
              currentLocale={currentLocale}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
