import moment from 'moment';
import {formatDateFields} from '@avada/firestore-utils';

/**
 * Format and present raw notification documents
 * @param {DocumentSnapshot[]} docs
 * @returns {Array}
 */
export function presentNotifications(docs) {
  return docs.map(doc => {
    const d = formatDateFields(doc.data());
    const date = d.timestamp ? moment(d.timestamp).format('MMM DD YY') : '';
    const dayAgo = d.timestamp ? moment(d.timestamp).fromNow() : '';
    return {
      ...d,
      id: doc.id,
      date,
      dayAgo
    };
  });
}
