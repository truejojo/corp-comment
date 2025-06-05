import { useFeedbackItemsContext } from '../../hooks/useFeedbackItemsContext';
import HashTagItem from './HashTagItem';

const HashTagList = () => {
  const { companyList, setFilterItem } = useFeedbackItemsContext('HashTagList');

  return (
    <ul className='hashtags'>
      <HashTagItem company='#All' onFilterItem={setFilterItem} />

      {companyList.map((company) => (
        <HashTagItem
          key={company}
          company={company}
          onFilterItem={setFilterItem}
        />
      ))}
    </ul>
  );
};

export default HashTagList;
