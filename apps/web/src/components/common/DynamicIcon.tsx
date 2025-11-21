import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

type IconName = keyof typeof LucideIcons;
type AnyIcon = ComponentType<LucideProps>;
type DynamicIconProps = {
  name: IconName;
  fallback?: IconName;
} & LucideProps;

export default function DynamicIcon({ name, fallback = "HelpCircle", ...props }: DynamicIconProps) {
  const Icons = LucideIcons as unknown as Record<string, AnyIcon>;
  const IconComponent = (Icons[name] || Icons[fallback]) as AnyIcon;
  return <IconComponent {...props} />;
}
