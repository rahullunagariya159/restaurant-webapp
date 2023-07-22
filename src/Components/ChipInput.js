import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    color: '#3f51b5',
    fontSize: '15px',
    fontWeight: '500',
  },
  selectWrapper: {
    padding: '8px 8px 8px 0',
    maxWidth: '425px'
  }
}));

const ChipInput = ({ items, selectedItems, placeholder, onOptionChange, id, disabled=false }) => {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionList, setOptionList] = useState([]);

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const handleCreateOption = (optionData) => {
    const optionArr = [];
    optionData?.map((option) => {
      return optionArr.push({ value: option, label: toTitleCase(option) });
    });
    return optionArr;
  };

  useEffect(() => {
    if (items?.length > 0) {
      const newOptionsList = handleCreateOption(items);
      setOptionList(newOptionsList);
    }
  }, [items]);

  useEffect(() => {
      const selOptionsList = handleCreateOption(selectedItems);
      setSelectedOption(selOptionsList);
  }, [selectedItems]);

  const handleOnChange = (value) => {
    setSelectedOption(value);
    const optionValList = [];
    value.map((option) => {
      return optionValList.push(option?.value);
    });

    onOptionChange(optionValList);
  };

  return (
    <div className={classes.chipInputContainer}>
      <Typography  variant="h1" component="h2" className={classes.title}>{placeholder}</Typography>
      <Select
        isDisabled={disabled}
        id={id || "chipInputBox"}
        className={classes.selectWrapper}
        defaultValue={selectedOption}
        onChange={handleOnChange}
        value={selectedOption}
        options={optionList}
        isMulti
        placeholder={placeholder || 'Select items...'}
        classNamePrefix="chipInputSelect"
      />
    </div>
  );
};

export default ChipInput;
