import React from 'react';
import Subtitle from './Subtitle';
import Paragraph from './Paragraph';
import Title from '../Title';
import TextRow from './TextRow';
import TextRowFlux from './TextRowFlux';
import TableRow2Col from './TableRow2Col';
import TableRow2ColHeader from './TableRow2ColHeader';
import TableRow2ColFlux from './TableRow2ColFlux';
import TableRow3Col from './TableRow3Col';
import TableRow3ColHeader from './TableRow3ColHeader';
import TableRow3ColFlux from './TableRow3ColFlux';

const SMALL_FIELD_OPTIONS = [
  {
    type: 'subtitle',
    text: 'Add Subtitle'
  },
  {
    type: 'paragraph',
    text: 'Add Paragraph'
  },
  {
    type: 'text-row',
    text: 'Add Text Row'
  },
  {
    type: 'text-row-flux',
    text: 'Add Flux Row'
  }
];

const MEDIUM_FIELD_OPTIONS = [
  {
    type: 'subtitle',
    text: 'Add Subtitle'
  },
  {
    type: 'paragraph',
    text: 'Add Paragraph'
  },
  {
    type: 'text-row',
    text: 'Add Text Row'
  },
  {
    type: 'text-row-flux',
    text: 'Add Flux Row'
  },
  {
    type: 'table',
    text: 'Add Table',
    subSettings: [
      {
        type: 'table-row-2col-header',
        text: 'Header (2 Col)'
      },
      {
        type: 'table-row-2col',
        text: 'Text Row (2 Col)'
      },
      {
        type: 'table-row-2col-flux',
        text: 'Flux Row (2 Col)'
      }
    ]
  }
]

const LARGE_FIELD_OPTIONS = [
  {
    type: 'title',
    text: 'Add Title'
  },
  {
    type: 'subtitle',
    text: 'Add Subtitle'
  },
  {
    type: 'paragraph',
    text: 'Add Paragraph'
  },
  {
    type: 'table',
    text: 'Add Table',
    subSettings: [
      {
        type: 'table-row-2col-header',
        text: 'Header (2 Col)'
      },
      {
        type: 'table-row-2col',
        text: 'Text Row (2 Col)'
      },
      {
        type: 'table-row-2col-flux',
        text: 'Flux Row (2 Col)'
      },
      {
        type: 'table-row-3col-header',
        text: 'Header (3 Col)'
      },
      {
        type: 'table-row-3col',
        text: 'Text Row (3 Col)'
      },
      {
        type: 'table-row-3col-flux',
        text: 'Flux Row (3 Col)'
      }
    ]
  }
]

/**
 * Renders a single Field element. No validation of whether an element *should* be rendered is
 * done here.
 * 
 * Props Required:
 * - `type`: The type of element to return/render
 * - `id` and `key`: The unique identifier for the element to be returned/rendered
 * - `content`: The content for the element to be returned/rendered
 * - `onUpdate`: Function to call whenever this element is updated
 * @returns Element corresponding with the passed type
 */
const FieldElement = (props) => {
  let element;

  switch (props.type) {
    case 'paragraph':
      element = <Paragraph
        content={props.content}
        key={props.id}
        id={props.id}
        onUpdate={props.onUpdate}
      />
      break;

    case 'subtitle':
      element = <Subtitle
        content={props.content}
        key={props.id}
        id={props.id}
        onUpdate={props.onUpdate}
      />
      break;

    case 'title':
      element = <Title
        content={props.content}
        key={props.id}
        id={props.id}
        onUpdate={props.onUpdate}
      />
      break;

    case 'text-row':
      element = <TextRow
        content={props.content}
        key={props.id}
        id={props.id}
        onUpdate={props.onUpdate}
      />
      break;

    case 'text-row-flux':
      element = <TextRowFlux
        content={props.content}
        key={props.id}
        id={props.id}
        onUpdate={props.onUpdate}
      />
      break;

    case 'table-row-2col':
      element = <TableRow2Col
        content={props.content}
        key={props.id}
        id={props.id}
        onUpdate={props.onUpdate}
      />
      break;

    case 'table-row-2col-header':
      element = <TableRow2ColHeader
        content={props.content}
        key={props.id}
        id={props.id}
        onUpdate={props.onUpdate}
      />
      break;

    case 'table-row-2col-flux':
      element = <TableRow2ColFlux
        content={props.content}
        key={props.id}
        id={props.id}
        onUpdate={props.onUpdate}
      />
      break;

    case 'table-row-3col':
      element = <TableRow3Col
        content={props.content}
        key={props.id}
        id={props.id}
        onUpdate={props.onUpdate}
      />
      break;

    case 'table-row-3col-header':
      element = <TableRow3ColHeader
        content={props.content}
        key={props.id}
        id={props.id}
        onUpdate={props.onUpdate}
      />
      break;

    case 'table-row-3col-flux':
      element = <TableRow3ColFlux
        content={props.content}
        key={props.id}
        id={props.id}
        onUpdate={props.onUpdate}
      />
      break;

    default:
      element = <p>Invalid element type</p>;
  }

  return (
    element
  );
}

export default FieldElement;
export { SMALL_FIELD_OPTIONS, MEDIUM_FIELD_OPTIONS, LARGE_FIELD_OPTIONS };