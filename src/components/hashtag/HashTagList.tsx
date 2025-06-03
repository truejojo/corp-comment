import HashTagItem from './HashTagItem';

type HashTagListProps = {
  companyList: string[];
  setFilterItem: (company: string) => void;
};

const HashTagList = ({ companyList, setFilterItem }: HashTagListProps) => {
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
