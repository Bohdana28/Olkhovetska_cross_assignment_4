import Config from 'react-native-config';

const API_KEY = Config.TICKETMASTER_API_KEY as string;


const EVENTS_API_URL =
    'https://app.ticketmaster.com/discovery/v2/events.json';

const EVENT_DETAILS_API_URL =
    'https://app.ticketmaster.com/discovery/v2/events';

const CLASSIFICATIONS_API_URL =
    'https://app.ticketmaster.com/discovery/v2/classifications.json';

export interface TicketmasterEvent {
    id: string;
    name: string;

    description?: string;

    url?: string;

    images?: {
        url: string;
        width?: number;
        height?: number;
    }[];

    dates?: {
        start?: {
            localDate?: string;
            localTime?: string;
            dateTBD?: boolean;
            dateTBA?: boolean;
            timeTBA?: boolean;
        };

        end?: {
            localDate?: string;
            localTime?: string;
        };
    };

    priceRanges?: {
        type?: string;
        currency?: string;
        min?: number;
        max?: number;
    }[];

    classifications?: {
        primary?: boolean;

        segment?: {
            id?: string;
            name?: string;
        };

        genre?: {
            id?: string;
            name?: string;
        };

        subGenre?: {
            id?: string;
            name?: string;
        };
    }[];

    _embedded?: {
        venues?: {
            id?: string;

            name?: string;

            city?: {
                name?: string;
            };

            state?: {
                name?: string;
                stateCode?: string;
            };

            country?: {
                name?: string;
                countryCode?: string;
            };

            address?: {
                line1?: string;
            };

            location?: {
                latitude?: string;
                longitude?: string;
            };
        }[];

        attractions?: {
            id?: string;
            name?: string;
            url?: string;
        }[];
    };
}

interface TicketmasterClassification {
    segment?: {
        id?: string;
        name?: string;
    };
}

/**
 * Fetch events from Ticketmaster.
 */
export async function fetchEvents(): Promise<
    TicketmasterEvent[]
> {
    const params = new URLSearchParams({
        countryCode: 'GB',
        size: '50',
        apikey: API_KEY,
    });

    const response = await fetch(
        `${EVENTS_API_URL}?${params.toString()}`,
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch events: ${response.status}`,
        );
    }

    const data = await response.json();

    return data._embedded?.events ?? [];
}


/**
 * Fetch events for a selected category.
 */
export async function fetchEventsByCategory(
    category: string,
): Promise<TicketmasterEvent[]> {
    const params = new URLSearchParams({
        countryCode: 'GB',
        size: '50',
        classificationName: category,
        apikey: API_KEY,
    });

    const response = await fetch(
        `${EVENTS_API_URL}?${params.toString()}`,
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch ${category} events: ${response.status}`,
        );
    }

    const data = await response.json();

    return data._embedded?.events ?? [];
}



/**
 * Search Ticketmaster events.
 *
 * Supports:
 * - text query
 * - category
 * - sorting
 * - price range
 * - date range
 */
export type EventSort =
    'date' | 'name';

export async function searchEvents(
    query: string,
    options?: {
        category?: string;
        sort?: EventSort;
        startDateTime?: string;
        endDateTime?: string;
        minPrice?: number;
        maxPrice?: number;
        location?: string;
    },
): Promise<TicketmasterEvent[]> {
    const params =
        new URLSearchParams();

    params.set(
        'countryCode',
        'GB',
    );

    params.set(
        'size',
        '50',
    );

    params.set(
        'apikey',
        API_KEY,
    );

    const trimmedQuery =
        query.trim();

    if (trimmedQuery) {
        params.set(
            'keyword',
            trimmedQuery,
        );
    }

    if (options?.category) {
        params.set(
            'classificationName',
            options.category,
        );
    }

    params.set(
        'sort',
        options?.sort === 'name'
            ? 'name,asc'
            : 'date,asc',
    );

    if (
        options?.startDateTime
    ) {
        params.set(
            'startDateTime',
            options.startDateTime,
        );
    }

    if (
        options?.endDateTime
    ) {
        params.set(
            'endDateTime',
            options.endDateTime,
        );
    }

    if (
        options?.minPrice !==
        undefined
    ) {
        params.set(
            'priceMin',
            String(
                options.minPrice,
            ),
        );
    }

    if (
        options?.maxPrice !==
        undefined
    ) {
        params.set(
            'priceMax',
            String(
                options.maxPrice,
            ),
        );
    }

    if (
        options?.location?.trim()
    ) {
        params.set(
            'city',
            options.location.trim(),
        );
    }

    const url =
        `${EVENTS_API_URL}?${params.toString()}`;

    console.log(
        'Ticketmaster search:',
        url.replace(
            API_KEY,
            'HIDDEN_API_KEY',
        ),
    );

    const response =
        await fetch(url);

    if (!response.ok) {
        let message =
            `Ticketmaster error: ${response.status}`;

        try {
            const errorData =
                await response.json();

            const apiMessage =
                errorData?.fault?.faultstring ||
                errorData?.message ||
                errorData?.error;

            if (apiMessage) {
                message += ` - ${apiMessage}`;
            }
        } catch {
            // Response is not JSON.
        }

        throw new Error(message);
    }

    const data =
        await response.json();

    return (
        data._embedded
            ?.events ?? []
    );
}
/**
 * Fetch a single event by its Ticketmaster ID.
 */
export async function fetchEventById(
    eventId: string,
): Promise<TicketmasterEvent> {
    const params = new URLSearchParams({
        apikey: API_KEY,
    });

    const response = await fetch(
        `${EVENT_DETAILS_API_URL}/${encodeURIComponent(
            eventId,
        )}.json?${params.toString()}`,
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch event: ${response.status}`,
        );
    }

    const data: TicketmasterEvent =
        await response.json();

    return data;
}

/**
 * Fetch top-level event categories.
 */
export async function fetchCategories(): Promise<string[]> {
    const params = new URLSearchParams({
        countryCode: 'GB',
        apikey: API_KEY,
    });

    const response = await fetch(
        `${CLASSIFICATIONS_API_URL}?${params.toString()}`,
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch categories: ${response.status}`,
        );
    }

    const data = await response.json();

    const classifications =
        data._embedded?.classifications ?? [];

    const categories: string[] = [];

    classifications.forEach(
        (item: TicketmasterClassification) => {
            const categoryName =
                item.segment?.name;

            if (
                categoryName &&
                categoryName.toLowerCase() !== 'undefined'
            ) {
                categories.push(categoryName);
            }
        },
    );

    return [...new Set(categories)];
}