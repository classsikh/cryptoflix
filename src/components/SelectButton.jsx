import React from 'react';
import styled from 'styled-components';

const SelectButtonStyled = styled.span`
  border: 1px solid gold;
  border-radius: 5px;
  padding: 10px ;
  padding-left: 20px;
  padding-right: 20px;
  font-family: "Montserrat";
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? 'gold' : '')};
  color: ${({ selected }) => (selected ? 'black' : '')};
  font-weight: ${({ selected }) => (selected ? 700 : 500)};
  transition: background-color 0.3s, color 0.3s;
  text-align:center;
width:22%;
  &:hover {
    background-color: gold;
    color: black;
  }

 
  


`;

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <SelectButtonStyled selected={selected} onClick={onClick}>
      {children}
    </SelectButtonStyled>
  );
};

export default SelectButton;
