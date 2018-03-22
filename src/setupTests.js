import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jsdom from 'jsdom';

const dom = new jsdom.JSDOM('<!doctype >');
global.document = dom.window.document;
configure({ adapter: new Adapter() });
