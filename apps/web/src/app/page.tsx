import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/lib/strapi/internationalization/i18n";

export default function IndexPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
