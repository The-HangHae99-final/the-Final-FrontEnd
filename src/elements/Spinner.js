import SyncLoader from "react-spinners/SyncLoader";

function Spinner() {
  return (
    <div className="contentWrap">
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <SyncLoader
          color="#7D8BDB"
          height={15}
          width={5}
          radius={2}
          margin={2}
        />
      </div>
    </div>
  );
}

export default Spinner;
