import moment from 'moment';

export default {
    filters: {
        date(date, format = 'DD/MM/YYYY') {
            return moment(date).format(format);
        },
        datetime(date, format = 'DD/MM/YYYY HH:mm') {
            return moment(date).format(format);
        }
    }
}