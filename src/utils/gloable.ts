import type { GlobalThemeOverrides } from "naive-ui";
import "./gloable.scss";

//全局样式
export const lightTheme: GlobalThemeOverrides = {
  Menu: {
    itemColorHover: "var(--menu-item-hover-light)",
  },
};

export const darkTheme: GlobalThemeOverrides = {    
  Menu: {
    itemColorHover: "var(--menu-item-hover-dark)",
  },
};
