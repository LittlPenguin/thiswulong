// 原始数据
export type MenuOption = {
  key: string;
  label: string;
  href?: string;
  parent_key?: string;
  ticon?: string;
};

// 新数据，包含子项
export type newMenuOption = MenuOption & {
  children?: MenuOption[];
};
