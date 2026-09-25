import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== "granted") {
    console.log("Notification permission not granted");
    return false;
  }

  console.log("Notification permission granted");
  return true;
}