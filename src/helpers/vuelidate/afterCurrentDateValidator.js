import moment from 'moment';
export default (value) => {
    return moment(value).startOf('day').isSameOrAfter(moment().startOf('day'));
}