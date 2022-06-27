import React from 'react';

export default function Quiz(props) {
  const answersElements = props.options.map((item, index) => {
    const style = {
      color:
        props.finish && item.isSelected && item.isCorrect
          ? '#293264'
          : '' || (props.finish && item.isSelected && !item.isCorrect)
          ? '#293264'
          : '' || (props.finish && !item.isSelected && item.isCorrect)
          ? '#293264'
          : '' || item.isSelected
          ? 'white'
          : '#293264',
      background:
        props.finish && item.isSelected && item.isCorrect
          ? '#94D7A2'
          : '' || (props.finish && item.isSelected && !item.isCorrect)
          ? '#F8BCBC'
          : '' || (props.finish && !item.isSelected && item.isCorrect)
          ? '#94D7A2'
          : '' || item.isSelected
          ? '#414c8a'
          : '',
      border:
        props.finish && item.isSelected && item.isCorrect
          ? '0px'
          : '' || (props.finish && item.isSelected && !item.isCorrect)
          ? '0px'
          : '' || (props.finish && !item.isSelected && item.isCorrect)
          ? '0px'
          : '' || item.isSelected
          ? '#414c8a'
          : '',
    };

    return (
      <li
        key={index}
        className='answer'
        style={style}
        onClick={() => props.handleSelection(item, props.item)}
      >
        {item.value}
      </li>
    );
  });

  return (
    <div>
      <li className='question'>
        <h3>{props.question}</h3>
      </li>
      <ul className='answersContainer'>{answersElements}</ul>
    </div>
  );
}
