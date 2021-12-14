import React, { useEffect } from "react";
import { getCurrentInstance } from "@tarojs/taro";
import type { PageMetaProps } from "@tarojs/components/types/PageMeta";

export interface IPageMetaProps
  extends Pick<
    PageMetaProps,
    | "backgroundTextStyle"
    | "backgroundColor"
    | "backgroundColorTop"
    | "backgroundColorBottom"
    | "scrollTop"
    | "scrollDuration"
    | "pageStyle"
    | "rootFontSize"
  > {
  rootBackgroundColor?: string;
  pageFontSize?: string;
  pageOrientation?: "auto" | "portrait" | "landscape";
}

export const PageMeta: React.FC<IPageMetaProps> = ({
  children,
  ...pageMeta
}) => {
  useEffect(() => {
    const { page } = getCurrentInstance();
    if (!page) return;
    page.setData({ pageMeta });
  }, [pageMeta]);
  return <>{children}</>;
};
