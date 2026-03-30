import { Oval } from "react-loader-spinner"

export const Loader = () => {
  return (
    <Oval
      visible={true}
      height="80"
      width="80"
      color="#ffffff"
      secondaryColor="#000000"
      ariaLabel="oval-loading"
      wrapperStyle={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.2)",
        backdropFilter: "blur(4px)",
        zIndex: 1,
      }}
    />
  )
}
