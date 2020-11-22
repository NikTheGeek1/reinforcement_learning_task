import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import TestTest from './TestTest';

configure({ adapter: new Adapter() })
describe('<TestTest />', () => {
    let wrapper;
    beforeEach(() =>{
        wrapper = shallow(<TestTest />)
    })
    // this looking for a css selector
    it('should render whatever', () => {
        expect(wrapper.find('div'))
    });
    // This looks for a specific JSX element in the component
    it('should render whatever', () => {
        expect(wrapper.contains(<div>I am a test</div>)).toEqual(true)
    })
});