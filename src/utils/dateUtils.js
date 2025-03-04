export const formatRelativeDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `Hace ${days} día${days > 1 ? 's' : ''}`;
    if (hours > 0) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    return 'Hace unos segundos';
};

export const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);

    const date = new Date(Date.UTC(year, month - 1, day));

    const formattedDay = date.getUTCDate();
    const formattedMonth = date.toLocaleString('es-ES', { month: 'long', timeZone: 'UTC' });
    const formattedYear = date.getUTCFullYear();

    return `${formattedDay} ${formattedMonth} ${formattedYear}`;
};
