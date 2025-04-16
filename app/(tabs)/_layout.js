import {Tabs} from "expo-router";

const TabLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    // headerShadowVisible:
                    headerShown: false,
                }}
            >
               <Tabs.Screen name={'index'} options={{title: 'Home'}}/>
               <Tabs.Screen name={'about'} options={{title: 'About'}}/>
            </Tabs>
        </>
    )
}

export default TabLayout;