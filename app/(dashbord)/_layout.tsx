import { Tabs, Redirect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useLock } from "@/context/LockContext";

const tabs = [
  { name: "home", icon: "home", title: "Home" },
  { name: "save", icon: "bookmark-border", title: "Save" },
  { name: "news", icon: "article", title: "News" },
  { name: "profile", icon: "person", title: "Profile" },
] as const;

const DashboardLayout = () => {
  const { locked } = useLock();

  // 🔐 Block dashboard when locked
  if (locked) {
    return <Redirect href="/lock" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name={tab.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default DashboardLayout;
