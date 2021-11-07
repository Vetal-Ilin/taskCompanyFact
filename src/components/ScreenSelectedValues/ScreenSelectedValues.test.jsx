import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { configure, shallow  } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from 'react-dom/test-utils';

import ScreenSelectedValues from './ScreenSelectedValues.jsx';

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

it('Правильность отображения данных в ScreenSelectedValues', () => {
    
    act(() => {
        render(<ScreenSelectedValues />, container);
    });
    const containerText = document.querySelector('.screen-selected-values__text');
    expect(containerText.textContent).toBe('Данные не выбраны');
    act(() => {
        render(<ScreenSelectedValues selectedListProperties={[['{"value":"hello2","key":"test3"}', 'object'], ['string2', 'string']]} />, container);
    });
    expect(containerText.textContent).toBe('{\"value\":\"hello2\",\"key\":\"test3\"}string2');

}); 

it('props className у компонента ScreenSelectedValues', () => {
    const component = shallow(<ScreenSelectedValues /> );
    const className = component.find('article').props().className;
    expect(className).toBe('screen-selected-values undefined');
    const componentAddProps = shallow(<ScreenSelectedValues  className={'props-class-name'} /> );
    const propsClassName = componentAddProps.find('article').props().className;
    expect(propsClassName).toBe('screen-selected-values props-class-name');
}); 