import { getSettings } from "@/lib/db/settings";
import SettingsClient from "./SettingsClient";

export const metadata = {
  title: "General Settings | Admin Panel",
};

export default async function SettingsPage() {
  const initialSettings = await getSettings();

  return <SettingsClient initialSettings={initialSettings} />;
}
