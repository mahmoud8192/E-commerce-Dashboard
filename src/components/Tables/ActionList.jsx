import Button from "../common/Button";

function ActionList({ actions = [], rowData = [] }) {
  console.log(rowData);

  return (
    <div className="">
      {actions.map((action) => (
        <Button
          variant={"ghost"}
          size={"sm"}
          icon={action.icon}
          onClick={() => action.onclick(rowData)}
        >
          {action.name}
        </Button>
      ))}
    </div>
  );
}

export default ActionList;
