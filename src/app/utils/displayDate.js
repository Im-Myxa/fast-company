const addLeadingZero = (data) => {
    return data < 10 ? "0" + data : data;
};

export function displayDate(data) {
    const dateNow = new Date();
    const date = new Date(parseInt(data));
    const yearsDif = dateNow.getFullYear() - date.getFullYear();
    if (yearsDif === 0) {
        const daysDif = dateNow.getDay() - date.getDay();
        if (daysDif === 0) {
            const hoursDif = dateNow.getHours() - date.getHours();
            if (hoursDif === 0) {
                const minutesDif = dateNow.getMinutes() - date.getMinutes();
                if (minutesDif >= 0 && minutesDif < 5) {
                    return " - 1 minute ago";
                }
                if (minutesDif >= 5 && minutesDif < 10) {
                    return " - 5 minutes ago";
                }
                if (minutesDif >= 10 && minutesDif < 30) {
                    return " - 10 minutes ago";
                }
                return " - 30 minutes ago";
            }
            return ` - ${date.getHours()}:${date.getMinutes()}`;
        }
        return ` - ${date.getDate()} ${date.toLocaleString("default", {
            month: "long"
        })}`;
    }
    return ` - ${date.getFullYear()}.${addLeadingZero(
        date.getMonth() + 1
    )}.${addLeadingZero(date.getDate())}`;
}
