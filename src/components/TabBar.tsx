import { Pressable, StyleSheet, Text, View } from "react-native";
import {
    House,
    Search,
    Ticket,
    User,
} from "lucide-react-native";
import { COLORS } from "../constants/theme";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tab: {
    alignItems: 'center',
    },

    active: {
        color: COLORS.primary,
    },

    inactive: {
        color: COLORS.textSecondary,
    },
});

interface TabBarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
    const tabs = [
        { name: 'Home', icon: House },
        { name: 'Search', icon: Search },
        { name: 'Bookings', icon: Ticket },
        { name: 'Profile', icon: User },
    ];


    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = tab.name === activeTab;
                    return (
                        <Pressable
                            style={styles.tab}
                            key={tab.name}
                            onPress={() => onTabChange(tab.name)}
                        >
                            <Icon
                                size={24}
                                color={isActive ? COLORS.primary : COLORS.textSecondary}
                            />

                            <Text
                                style={{
                                    color: isActive ? COLORS.primary : COLORS.textSecondary,
                                }}
                            >
                                {tab.name}
                            </Text>
                        </Pressable>
                    );
            })}
           
        </View>
    )
    
}