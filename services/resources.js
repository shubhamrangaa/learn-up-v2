import { database } from '../firebaseConfig';

import { collection, getDocs, query, where } from 'firebase/firestore';

const colRef = collection(database, 'resources');

const getResources = async () => {
  const data = await getDocs(colRef);
  return data;
};

const getFilteredResources = async (field, value) => {
  // const data = await getDocs(colRef)
  // const { field, value } = filterOptions;
  const q = await query(colRef, where(field, '==', value));
  const data = await getDocs(q);
  console.log('done');

  return data;
};

export { getResources, getFilteredResources };
