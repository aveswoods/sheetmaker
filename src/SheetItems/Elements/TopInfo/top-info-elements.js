import Label from "./Label";
import Text from "./Text";

const MAIN_INFO_OPTIONS = [
  {
    type: 'label',
    text: 'Add Label'
  },
  {
    type: 'text',
    text: 'Add Text'
  }
];

/**
 * Renders a single Top Info element. No validation of whether an element *should* be rendered is
 * done here.
 * 
 * Props Required:
 * - `type`: The type of element to return/render
 * - `id` and `key`: The unique identifier for the element to be returned/rendered
 * - `content`: The content for the element to be returned/rendered
 * - `onUpdate`: Function to call whenever this element is updated
 * @returns Element corresponding with the passed type
 */
const TopInfoElement = (props) => {
  let element;

  switch (props.type) {
    case 'label':
      element = <Label
        content={props.content}
        id={props.id}
        key={props.id}
        onUpdate={props.onUpdate}
      />
      break;

    case 'text':
      element = <Text
        content={props.content}
        id={props.id}
        key={props.id}
        onUpdate={props.onUpdate}
      />
      break;

    default:
      element = <p>Invalid element type</p>
  }

  return (
    element
  );
}

export default TopInfoElement;
export { MAIN_INFO_OPTIONS };