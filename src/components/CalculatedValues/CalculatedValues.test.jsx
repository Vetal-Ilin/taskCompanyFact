import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { configure, shallow  } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from 'react-dom/test-utils';

import CalculatedValues from './CalculatedValues.jsx';

configure({ adapter: new Adapter() });

let container = null;
beforeEach(() => {
  // подготавливаем DOM-элемент, куда будем рендерить
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // подчищаем после завершения
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Правильность отображения данных в CalculatedValues', () => {
    let propsTitle = 'Перемноженные числовые значения:';
    let propsValue = '25'
    act(() => {
        render(<CalculatedValues />, container);
      });
    expect(container.textContent).toBe('Данные не выбраны');
    act(() => {
        render(<CalculatedValues title={propsTitle} />, container);
      });
    expect(container.textContent).toBe(`${propsTitle}Данные не выбраны`);
    act(() => {
        render(<CalculatedValues title={propsTitle} calculatedValue={propsValue} />, container);
      });
    expect(container.textContent).toBe(`${propsTitle}${propsValue}`);
}); 

it('Наличие класса у компонента', () => {
    const component = shallow(<CalculatedValues /> );
    const className = component.find('article').props().className;
    expect(className).toBeTruthy();
}); 

it('props className у компонента', () => {
    const component = shallow(<CalculatedValues className={'props-class-name'} /> );
    const className = component.find('article').props().className;
    expect(className).toBe('calculated-values props-class-name');
}); 