import type { GlobalThemeOverrides } from "naive-ui";
import "./gloable.scss";

//全局样式
export const lightTheme: GlobalThemeOverrides = {
  Menu: {
    // 背景色
    itemColorHover: "var(--menu-item-banner-light)",
    itemColorActive: "var(--menu-item-banner-light)",
    itemColorActiveHover: "var(--menu-item-banner-light)",
    // 文字颜色
    itemTextColorHover: "var(--menu-item-text-color-light)",
    itemTextColorActiveHover: "var(--menu-item-text-color-light)",
    itemTextColorActive: "var(--menu-item-text-color-light)",
    // 图标
    itemIconColorHover: "var(--menu-item-text-color-light)",
    itemIconColorActive: "var(--menu-item-text-color-light)",
    itemIconColorActiveHover: "var(--menu-item-text-color-light)",
    // 箭头颜色
    arrowColorChildActive: "var(--menu-item-text-color-light)",
    arrowColorChildActiveHover: "var(--menu-item-text-color-light)",
    // 子项激活时的背景颜色
    itemTextColorChildActive: "var(--menu-item-Child-Active-light)",
    itemTextColorChildActiveHover: "var(--menu-item-text-color-light)",
    itemIconColorChildActive: "var(--menu-item-Child-Active-light)",
    itemIconColorChildActiveHover: "var(--menu-item-text-color-light)",
    // 折叠时激活项的背景颜色
    itemColorActiveCollapsed: "var(--menu-item-banner-light)",
    // 分组文字标题颜色
    groupTextColor: "var(--menu-white-light)",
    // 字体大小
    fontSize: "16px",
  },
  // 下拉菜单
  Dropdown: {
    // 选项颜色
    optionTextColor: "var(--menu-item-text-color-light)",
    color: "var(--menu-item-banner-light)",
    optionColorHover: "var(--menu-white-light)",
    // 选中颜色
    optionTextColorActive: "var(--menu-item-text-color-light)",
    optionColorActive: "var(--menu-white-light)",
    // 子项选中颜色
    optionTextColorChildActive: "var(--menu-option-child-active-light)",
  },
};

export const darkTheme: GlobalThemeOverrides = {
  Menu: {
    // 背景色
    itemColorHover: "var(--menu-item-banner-dark)",
    itemColorActive: "var(--menu-item-banner-dark)",
    itemColorActiveHover: "var(--menu-item-banner-dark)",
    // 文字颜色
    itemTextColorHover: "var(--menu-item-text-color-dark)",
    itemTextColorActiveHover: "var(--menu-item-text-color-dark)",
    itemTextColorActive: "var(--menu-item-text-color-dark)",
    // 图标
    itemIconColorHover: "var(--menu-item-text-color-dark)",
    itemIconColorActive: "var(--menu-item-text-color-dark)",
    itemIconColorActiveHover: "var(--menu-item-text-color-dark)",
    // 箭头颜色
    arrowColorChildActive: "var(--menu-item-text-color-dark)",
    arrowColorChildActiveHover: "var(--menu-item-text-color-dark)",
    // 子项激活时的背景颜色
    itemTextColorChildActive: "var(--menu-item-Child-Active-dark)",
    itemTextColorChildActiveHover: "var(--menu-item-text-color-dark)",
    itemIconColorChildActive: "var(--menu-item-Child-Active-dark)",
    itemIconColorChildActiveHover: "var(--menu-item-text-color-dark)",
    // 折叠时激活项的背景颜色
    itemColorActiveCollapsed: "var(--menu-item-banner-dark)",
    // 分组文字标题颜色
    groupTextColor: "var(--menu-white-dark)",
    // 字体大小
    fontSize: "16px",
  },
  // 下拉菜单
  Dropdown: {
    // 选项颜色
    optionTextColor: "var(--menu-item-text-color-dark)",
    color: "var(--menu-item-banner-dark)",
    optionColorHover: "var(--menu-white-dark)",
    // 选中颜色
    optionTextColorActive: "var(--menu-item-text-color-dark)",
    optionColorActive: "var(--menu-white-dark)",
    // 子项选中颜色
    optionTextColorChildActive: "var(--menu-option-child-active-dark)",
  },
};
