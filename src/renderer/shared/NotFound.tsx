import svg404 from "@/src/renderer/public/img/404.svg";

const NotFound = () => {
  return (
    <div
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        // backgroundColor:'red'
      }}
    >
      <div>
        <img src={svg404} width={230} height={230} />
      </div>
      <div className="flex flex-col gap-2">
        <h3>Upss!</h3>
        <p color={"gray"}>
          No encontramos lo que buscas
        </p>
      </div>
    </div>
  );
};

export default NotFound;