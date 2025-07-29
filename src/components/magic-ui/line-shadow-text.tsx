import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";

interface LineShadowTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>,
    MotionProps {
  shadowColor?: string;
  shadowOffset?: string; // 如 '0.08em 0.08em'
  animated?: boolean; // 新增
  as?: React.ElementType;
}

export function LineShadowText({
  children,
  shadowColor = "black",
  shadowOffset = "0.04em 0.04em", // x y 偏移
  animated = false, // 默认关闭动画
  className,
  as: Component = "span",
  ...props
}: LineShadowTextProps) {
  const MotionComponent = motion.create(Component);
  const content = typeof children === "string" ? children : null;

  if (!content) {
    throw new Error("LineShadowText only accepts string content");
  }

  if (!animated) {
    // text-shadow 方案，断行一致
    return (
      <MotionComponent
        style={{
          textShadow: `${shadowOffset} 0 ${shadowColor}`,
        } as React.CSSProperties}
        className={cn(
          "relative z-0 inline-block",
          className,
        )}
        {...props}
      >
        {content}
      </MotionComponent>
    );
  }

  // 动画阴影方案，伪元素+bg-clip-text+动画
  return (
    <MotionComponent
      style={{
        "--shadow-color": shadowColor,
        "--shadow-offset": shadowOffset,
        "--animate-line-shadow": "line-shadow 15s linear infinite",
      } as React.CSSProperties}
      className={cn(
        "relative z-0 inline-flex line-shadow-inherit",
        "after:absolute after:left-[var(--shadow-offset)] after:top-[var(--shadow-offset)] after:content-[attr(data-text)]",
        "after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]",
        "after:-z-10 after:bg-[length:0.06em_0.06em] after:bg-clip-text after:text-transparent",
        "after:animate-line-shadow",
        className,
      )}
      data-text={content}
      {...props}
    >
      {content}
    </MotionComponent>
  );
}
