import { StyleSheet } from "react-native";

const gastoCategoriaStyle = StyleSheet.create({
  container: {
    width: "100%",
    // height: 380,
    justifyContent: "center",
    alignItems: "center",
    top: 10,
  },
  container1: {
    width: "100%",
    // height: 380,
    justifyContent: "center",
    alignItems: "center",
    top: -20,
    paddingVertical: 25,
  },
  texto4: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: "5%",
  },
  picker: {
    backgroundColor: "#d9d9d9",
    width: 200,
    borderBottomStartRadius: 30,
  },
  pickerItem: {
    color: "#red",
  },
  item: {
    fontSize: 18,
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto",
  },
  grafico: {
    // position: "absolute",
    top: -15,
  },
  scrollContainer: {
    // flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: "center"
},
});

export default gastoCategoriaStyle;
