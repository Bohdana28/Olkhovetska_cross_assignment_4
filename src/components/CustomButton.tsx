import { StyleSheet, TouchableOpacity, Text, useWindowDimensions, StyleProp, ViewStyle} from "react-native";
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "../constants/theme";


const styles = StyleSheet.create({
    text: {
        ...TYPOGRAPHY.semiBold,
        fontSize: 12,

    },
    primaryText: {
        color: COLORS.background,
    },
    secondaryText: {
        color: COLORS.primary,
    },
    
    button: {
        height: 48,
        borderRadius: RADIUS.sm,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    primary: {
        backgroundColor: COLORS.primary,
    },
    secondary: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: COLORS.primary,
    },
});
   


interface CustomButtonProps {
    title: string;
    variant: "primary" | "secondary";
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}



export default function CustomButton({ title, onPress, variant, style }: CustomButtonProps) {
    const { width } = useWindowDimensions();
    const buttonWidth = Math.min(
        width - SPACING.lg * 2,
        343
    );
    return (
        <TouchableOpacity style={[
            styles.button,
            { width: buttonWidth },
            style,
            variant === 'primary' ? styles.primary : styles.secondary
        ]} onPress={onPress}>
            <Text style={[
            styles.text,
            variant === 'primary' ? styles.primaryText : styles.secondaryText
            ]} >{title}</Text>

        </TouchableOpacity>
    )
}