import { Tabs } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"

const tabs = [
    { name: "home", icon: "home", title: "Home" },
    { name: "taplese exsks", icon: "list", title: "Tasks" },
    { name: "news", icon: "article", title: "News" },
    { name: "profile", icon: "person", title: "Profile" },
] as const

const dashboardlayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false
            }}
            // tabBar={(props) => <></>}    
        >
            
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
    )
}

export default dashboardlayout