import Dropdown from './component/Dropdown';

function App() {
  const options = ['VueJs', 'ReactJs', 'Laravel', 'Angular'];
  const label = 'Select Framework';
  const handleSelectionChange = (selected) => {
    console.log('Selected options:', selected);
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Technical Test for Makyo</h1>
      <Dropdown
        label={label}
        options={options}
        multiple
        searchable
        usePortal={false} // Set to true to use portal if needed
        onChange={handleSelectionChange}
      />
    </div>
  );
}

export default App;
