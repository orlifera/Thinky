export const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short', // "Mer" for Mercoledì
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Rome', // fusorario italiano
    };

    const italianFormatter = new Intl.DateTimeFormat('it-IT', options);
    return italianFormatter.format(new Date(date));
};