import React from 'react';
import Dropdown from './Dropdown';
import '../index.css';

export default {
  title: 'Dropdown',
  component: Dropdown,
};

const Template = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Select Framework',
  options: ['VueJs', 'ReactJs', 'Laravel', 'Angular'],
  multiple: true,
  searchable: true,
  zIndex: 1000,
  usePortal: false,
};

export const WithPortal = Template.bind({});
WithPortal.args = {
  options: ['VueJs', 'ReactJs', 'Laravel', 'Angular'],
  multiple: true,
  searchable: true,
  zIndex: 1000,
  usePortal: true,
};