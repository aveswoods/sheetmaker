import MainStat from './MainStat';
import SubStat from './SubStat';
import TripletStats from './TripletStats';
import Title from '../Title';

const MAIN_STAT_OPTIONS = [
  {
    type: 'main',
    text: 'Add Main Stat'
  },
  {
    type: 'sub',
    text: 'Add Sub-Stat'
  },
  {
    type: 'triplet',
    text: 'Add 3 Sub-Stats'
  },
  {
    type: 'title',
    text: 'Add Label'
  }
];

/**
 * Renders a single Stat element. No validation of whether an element *should* be rendered is
 * done here.
 * 
 * Props Required:
 * - `type`: The type of element to return/render
 * - `id` and `key`: The unique identifier for the element to be returned/rendered
 * - `content`: The content for the element to be returned/rendered
 * - `onUpdate`: Function to call whenever this element is updated
 * @returns Element corresponding with the passed type
 */
const StatElement = (props) => {
  let element;

  switch (props.type) {
    case 'main':
      element = <MainStat
        content={props.content}
        key={props.id}
        id={props.id}
        onUpdate={props.onUpdate}
      />;
      break;

    case 'sub':
      element = <SubStat
        content={props.content}
        key={props.id}
        id={props.id}
        onUpdate={props.onUpdate}
      />;
      break;

    case 'triplet':
      element = <TripletStats
        content={props.content}
        key={props.id}
        id={props.id}
        onUpdate={props.onUpdate}
      />;
      break;

    case 'title':
      element = <Title
        content={props.content}
        key={props.id}
        id={props.id}
        onUpdate={props.onUpdate}
      />;
      break;

    default:
      element = <p>Invalid element type</p>;
  }
  return (
    element
  );
}

export default StatElement;
export { MAIN_STAT_OPTIONS }