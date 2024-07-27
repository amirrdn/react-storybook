# Dropdown Component

## Features

- **Searchable Dropdown**
- **Portal Support**
- **Single or Multiple Selection**
- **Customizable Option Rendering**
- **Search Filtering**
- **Toggle Features**
- **Z-Index Compatibility**

## Usage

```jsx
import React from 'react';
import Dropdown from './components/Dropdown';

const options = ['VueJs', 'ReactJs', 'Laravel', 'Angular'];
const label = 'Select Framework';

const App = () => (
  <div>
    <Dropdown
      options={options}
      multiple
      searchable
      onChange={(selected) => console.log(selected)}
    />
  </div>
);

export default App;
