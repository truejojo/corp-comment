import { useMemo } from 'react';
import { useFeedbackItemsStore } from '../../stores/feedbackItemsStore';
import HashTagItem from './HashTagItem';

const HashTagList = () => {
  const feedbackItems = useFeedbackItemsStore((state) => state.feedbackItems);
  const setSelectCompany = useFeedbackItemsStore(
    (state) => state.setSelectCompany,
  );

  const companyList = useMemo(() => {
    return [...new Set(feedbackItems.map((item) => item.company))];
  }, [feedbackItems]);

  return (
    <ul className='hashtags'>
      <HashTagItem company='#All' onFilterItem={setSelectCompany} />

      {companyList.map((company) => (
        <HashTagItem
          key={company}
          company={company}
          onFilterItem={setSelectCompany}
        />
      ))}
    </ul>
  );
};

export default HashTagList;
