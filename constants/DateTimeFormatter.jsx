import moment from 'moment';

export const formatDate = (dateString) => {
  const date = moment(dateString);
  const now = moment();

  const diffInMinutes = now.diff(date, 'minutes');
  const diffInDays = now.diff(date, 'days');
  const diffInMonths = now.diff(date, 'months');
  const diffInYears = now.diff(date, 'years');

  if (diffInYears >= 1) {
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''}`;
  } else if (diffInMonths >= 1) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  } else if (diffInDays >= 1) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else if (diffInMinutes >= 1) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
};

