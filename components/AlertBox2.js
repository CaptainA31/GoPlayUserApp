import React, { useState } from "react";
import { Text, View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import Button from '../components/Button'
import {LinearGradient} from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "../GlobalStyles";

const AlertBox2 = ({ alertBox, setAlertBox, cancel, success, message, title, onSuccess, onAbort }) => {


  return (
    <Modal

      animationType="slide"
      transparent={true}
      visible={alertBox}
      onRequestClose={() => {

        setAlertBox(false);
      }}
    >
      <View style={{ height: "100%", justifyContent: "center" }}>

        <View style={{ width: "75%", borderRadius: 15, overflow: "hidden", alignSelf: "center", backgroundColor: "white" }}>
          <View style={{ paddingVertical: "5%", paddingHorizontal: "2%" }}>
            <Text style={{ fontSize: RFValue(17), alignSelf: "center", fontWeight: "bold", textAlign: "center" }}>{title}</Text>
            <Text style={{ fontSize: RFValue(15), alignSelf: "center", textAlign: "center" }}>{message} </Text>
          </View>

          <View style={{ flexDirection: "row", borderTopWidth: 0.8, borderColor: colors.shade, justifyContent: "space-between", paddingVertical: "4%" }}>
            <   TouchableOpacity
              onPress={() => setAlertBox(false)}
              style={{ width: "50%", alignItems: "center" }}>
              <Text style={{ fontSize: RFValue(14), fontWeight: "bold" }}>{cancel ? cancel : "Don't leave"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onAbort()}
              style={{ width: "50%", alignItems: "center" }}>
              <Text style={{ fontSize: RFValue(14), fontWeight: "bold" }}>{success ? success : "Discard"}</Text>
            </TouchableOpacity>
          </View>


        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({

  centeredView: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    width: "99%",
    height: "20%",
    borderWidth: 2,
    borderColor: "#20212429",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-around",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 4,
    shadowRadius: 19.46,
    elevation: 4,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  message: {
    color: "black",
    fontSize: RFValue(16),
    letterSpacing: 1,
    fontWeight: "bold",
    textAlign: "center"
  },
  h1: {
    color: colors.light,
    fontSize: RFValue(18),
    fontWeight: "bold",

  },
  button: {
    height: RFValue(40),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4
  },
  text: {
    fontSize: RFValue(16),
    color: "white"
  },
});

export default AlertBox2;