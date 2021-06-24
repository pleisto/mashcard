import * as enzyme from 'enzyme'
// Unofficial adapter for React 17 for Enzyme.
// https://www.npmjs.com/package/@wojtekmaj/enzyme-adapter-react-17
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

enzyme.configure({ adapter: new Adapter() })