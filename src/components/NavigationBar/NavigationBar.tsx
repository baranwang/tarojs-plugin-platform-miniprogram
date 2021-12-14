import { useEffect } from "react";
import { getCurrentInstance } from "@tarojs/taro";
import type { NavigationBarProps } from "@tarojs/components/types/NavigationBar";

export const NavigationBar = (navigationBar: NavigationBarProps) => {
  useEffect(() => {
    const { page } = getCurrentInstance();
    if (!page) return;
    page.setData({ navigationBar });
  }, [navigationBar]);
  return <></>;
};
