type HashTagItemProps = {
  company: string;
  onFilterItem: (company: string) => void;
};

const HashTagItem = ({ company, onFilterItem }: HashTagItemProps) => {
  const filterItem = company === '#All' ? '' : company.toUpperCase();

  return (
    <li key={company}>
      <button onClick={() => onFilterItem(filterItem)} type='button'>
        {company === '#All' ? 'All' : `#${company}`}
      </button>
    </li>
  );
};

export default HashTagItem;
