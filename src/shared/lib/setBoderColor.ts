export const setBoderColor = (inputDate: string) => {
    const date = new Date(inputDate);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / (1000 * 3600 * 24);
    let borderColor = '#2F80ED';

    if (diff > 7 && diff <= 30) {
        borderColor = '#27AE60';
    } else if (diff > 30 && diff <= 180) {
        borderColor = '#F2C94C';
    } else if (diff > 180) {
        borderColor = '#EB5757 ';
    }

    return borderColor;
};
