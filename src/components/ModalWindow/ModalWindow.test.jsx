import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { configure, shallow  } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from 'react-dom/test-utils';

import ModalWindow from './ModalWindow';

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

// проверка на появление и удаление компонента при разных полученных пропсов состояния компонента
it('renders with or without error', () => {
    const wrapperPropsTrue = shallow(<ModalWindow showModalWindowError={true}/>);
    const wrapperPropsFalse = shallow(<ModalWindow showModalWindowError={false}/>);
    act(() => {
      render(wrapperPropsTrue, container);
    });
    expect(wrapperPropsTrue.find('article').exists()).toBeTruthy();

    act(() => {
        render(wrapperPropsFalse, container);
    });
    expect(wrapperPropsFalse.find('article').exists()).toBeFalsy();
});

// исполнение функции при клике на кнопку OK
it('execution of the function when clicking on the OK button', () => { 
  const mockCallBack = jest.fn();
  const component = shallow(<ModalWindow showModalWindowError={true} closeModalWindowError={mockCallBack}/> );
  expect(mockCallBack.mock.calls.length).toBe(0);
  component.find('#modal-window-button-OK-id').simulate('click');
  expect(mockCallBack.mock.calls.length).toBe(1);
});



