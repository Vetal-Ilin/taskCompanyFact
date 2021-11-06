import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { configure, shallow  } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from 'react-dom/test-utils';

import Select from './Select.jsx';

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

it('Наличие первого option который отображает тип принимаемых данных в Select', () => {
    const component = shallow(<Select />);
    act(() => {
      render(component, container);
    });
    expect(component.find('#select-first-option-id').exists()).toBeTruthy();
});

it('Правильность отображения данных в select', () => {
    act(() => {
      render(<Select options={[1, 2, 3]} />, container);
    });
    expect(container.innerHTML).toBe('<select class="select"><option value="DEFAULT" hidden="" id="select-first-option-id" selected="">number</option><option>1</option><option>2</option><option>3</option></select>');
    act(() => {
        render(<Select options={['string1', 'string2', 'string3']} />, container);
    });
    expect(container.innerHTML).toBe('<select class="select"><option value="DEFAULT" hidden="" id="select-first-option-id" selected="">string</option><option>string1</option><option>string2</option><option>string3</option></select>');
    act(() => {
        render(<Select options={[{"value":"hello","key":"test1"}, {"value":"hell3","key":"test4"}, {"value":"hello4","key":"test5"}]} />, container);
    });
    expect(container.innerHTML).toBe('<select class="select"><option value="DEFAULT" hidden="" id="select-first-option-id" selected="">object</option><option>{"value":"hello","key":"test1"}</option><option>{"value":"hell3","key":"test4"}</option><option>{"value":"hello4","key":"test5"}</option></select>');
    act(() => {
        render(<Select options={[true, false, true]} />, container);
    });
    expect(container.innerHTML).toBe('<select class="select"><option value="DEFAULT" hidden="" id="select-first-option-id" selected="">boolean</option><option>true</option><option>false</option><option>true</option></select>');
});