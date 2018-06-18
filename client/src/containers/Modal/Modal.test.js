import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Modal from './Modal.js';
import Input from '../../components/UI/Input/Input';

configure({adapter: new Adapter()});

describe('<Modal />', () => {
    it('should render when isFocused is passed as true', () => {
        const wrapper = shallow(<Modal isFocused={true}/>);
        expect(wrapper.prop('children')).toBeDefined();
    });

  

    it('should not render when isFocused is passed as false', () => {        
        const wrapper = shallow(<Modal isFocused={false} />);
        expect(wrapper.prop('children')).toBeUndefined();
    });

});