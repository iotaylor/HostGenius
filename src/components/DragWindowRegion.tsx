import {
  closeWindow,
  maximizeWindow,
  minimizeWindow,
} from "@/helpers/window_helpers";
import React, { type ReactNode } from "react";
import { cn } from "@/utils/tailwind";

interface DragWindowRegionProps {
  title?: ReactNode;
}

export default function DragWindowRegion({ title }: DragWindowRegionProps) {
  // 检查是否为macOS系统
  const isMac = (window as any).platform?.isMac ?? false;

  return (
    <div className="flex w-screen items-stretch justify-between">
      {/* 拖拽区域 - 在所有平台都保留 */}
      <div
        className={cn(
          "draglayer border-border/90 w-full border-b",
          isMac && "pt-9", // macOS 添加顶部间距避免被系统按钮遮挡
        )}
      >
        {title && (
          <div className="flex flex-1 p-2 text-xs whitespace-nowrap text-gray-400 select-none">
            {title}
          </div>
        )}
      </div>
      {/* 只在非macOS系统上显示自定义窗口控制按钮 */}
      {!isMac && <WindowButtons />}
    </div>
  );
}

function WindowButtons() {
  return (
    <div className="flex">
      <button
        title="Minimize"
        type="button"
        className="hover:bg-accent p-2 transition-colors"
        onClick={minimizeWindow}
      >
        <svg
          aria-hidden="true"
          role="img"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <rect fill="currentColor" width="10" height="1" x="1" y="6"></rect>
        </svg>
      </button>
      <button
        title="Maximize"
        type="button"
        className="hover:bg-accent p-2 transition-colors"
        onClick={maximizeWindow}
      >
        <svg
          aria-hidden="true"
          role="img"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <rect
            width="9"
            height="9"
            x="1.5"
            y="1.5"
            fill="none"
            stroke="currentColor"
          ></rect>
        </svg>
      </button>
      <button
        type="button"
        title="Close"
        className="hover:bg-destructive hover:text-destructive-foreground p-2 transition-colors"
        onClick={closeWindow}
      >
        <svg
          aria-hidden="true"
          role="img"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <polygon
            fill="currentColor"
            fillRule="evenodd"
            points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"
          ></polygon>
        </svg>
      </button>
    </div>
  );
}
