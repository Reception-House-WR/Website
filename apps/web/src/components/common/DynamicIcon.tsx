import * as LucideIcons from "lucide-react";
import type { ComponentProps, ComponentType } from "react";

type IconName = keyof typeof LucideIcons;
type AnyIcon = ComponentType<any>;
type DynamicIconProps = {
  name: IconName;
  fallback?: IconName;
} & ComponentProps<AnyIcon>;

export default function DynamicIcon({ name, fallback = "HelpCircle", ...props }: DynamicIconProps) {
  const Icons = LucideIcons as unknown as Record<string, AnyIcon>;
  const IconComponent = (Icons[name] || Icons[fallback]) as AnyIcon;
  return <IconComponent {...props} />;
}
