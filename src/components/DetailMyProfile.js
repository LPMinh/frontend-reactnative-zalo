import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Button, StyleSheet } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faCalendarAlt, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileDisplay = ({ navigation }) => {
  const [user, setUser] = useState({});

  
    AsyncStorage.getItem("user").then((userData) => {
      setUser(JSON.parse(userData));
    });


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../images/icon/left-arrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Thông tin cá nhân</Text>
      </View>

      {/* Avatar */}
      <TouchableOpacity style={styles.avatarContainer}>
        {user.avatar ? (
          <Image
            source={{ uri: user?.avatar }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <FontAwesomeIcon icon={faUser} size={60} color="#555" />
          </View>
        )}
      </TouchableOpacity>

      {/* User Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Họ và Tên:</Text>
        <Text style={styles.infoText}>{user?.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Ngày Sinh:</Text>
        <Text style={styles.infoText}>{user?.dob || "Chưa cập nhật"}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Giới Tính:</Text>
        <Text style={styles.infoText}>
          {user?.gender === false ? "Nữ" : "Nam"}
        </Text>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("updateinfo")}>
        <Text style={styles.editButtonText}>Chỉnh Sửa Thông Tin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
   
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#0895FB",
    paddingVertical: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  avatarPlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: "#ccc",
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoLabel: {
    width: 100,
    color: "#555",
    fontWeight: "bold",
  },
  infoText: {
    flex: 1,
    color: "#333",
  },
  editButton: {
    backgroundColor: "#0895FB",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileDisplay;
