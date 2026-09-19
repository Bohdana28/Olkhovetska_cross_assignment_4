import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Booking {
    id: string;
    name: string;
    image?: string;
    date?: string;
    time?: string;
    venue?: string;
    ticketType: string;
    quantity: number;
    ticketPrice: number;
}

interface BookingsState {
    items: Booking[];
}

const initialState: BookingsState = {
    items: [],
};

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        addBooking: (
            state,
            action: PayloadAction<Booking>,
        ) => {
            const existingBooking = state.items.find(
                booking => booking.id === action.payload.id,
            );

            if (existingBooking) {
                existingBooking.quantity +=
                    action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },

        removeBooking: (
            state,
            action: PayloadAction<string>,
        ) => {
            state.items = state.items.filter(
                booking => booking.id !== action.payload,
            );
        },

        updateQuantity: (
            state,
            action: PayloadAction<{
                id: string;
                quantity: number;
            }>,
        ) => {
            const booking = state.items.find(
                item => item.id === action.payload.id,
            );

            if (booking) {
                booking.quantity = action.payload.quantity;
            }
        },
    },
});

export const {
    addBooking,
    removeBooking,
    updateQuantity,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;