import { Button } from "semantic-ui-react";

function AddDelButtons(props) {
  return (
    <div>
      <Button primary onClick={props.handleAdd}>
        Add Credit Line
      </Button>
      <Button secondary onClick={props.handleDelete}>
        Delete Credit Line
      </Button>
    </div>
  );
}

export default AddDelButtons;
