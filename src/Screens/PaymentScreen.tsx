import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const PaymentScreen = () => {
  const [region, setRegion] = useState({
    latitude: 10.8381,
    longitude: 106.677,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<
    { lat: string; lon: string; display_name: string }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("Đường số 27 phường 6 Gò Vấp");

  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const timeout = setTimeout(() => {
        fetchAddressSuggestions(searchQuery);
      }, 1000); //nhập sau 1s ngưng nhập thì bắt đầu tìm
      return () => clearTimeout(timeout);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const controllerRef = useRef<AbortController | null>(null);

  const fetchAddressSuggestions = async (input: string) => {
    if (!input) {
      setSuggestions([]);
      return;
    } //input trống thì không tìm và không show gợi ý

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      input
    )}&countrycodes=VN&addressdetails=1&limit=5`;

    console.log("🔍 Fetching address suggestions for:", input);

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "MyApp/EcommerceApp",
          Referer: "https://myapp.com",
        },
        signal: controller.signal,
      });

      console.log("📡 API response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: { lat: string; lon: string; display_name: string }[] =
        await response.json();

      console.log("✅ API returned data:", data);

      setSuggestions(data);
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      console.error("❌ Error fetching address suggestions:", error);
    }
  };

  const selectAddress = (item: {
    lat: string;
    lon: string;
    display_name: string;
  }) => {
    setAddress(item.display_name); // Lưu địa chỉ hiển thị trên màn hình
    setRegion({
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    setSuggestions([]);
    setSearchQuery(""); // Xóa input để không tìm kiếm tiếp
  };

  const products = [
    { id: "1", name: "Product A", price: 430000 },
    { id: "2", name: "Product B", price: 150000 },
    { id: "3", name: "Product C", price: 50000 },
    { id: "4", name: "Product D", price: 500000 },
    { id: "5", name: "Product E", price: 80000 },
    { id: "6", name: "Product F", price: 350000 },
    { id: "7", name: "Product G", price: 240000 },
  ];

  const total = products.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>

      <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>
        Your Address
      </Text>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 10,
          color: "blue",
        }}
      >
        {address || "No address selected"}
      </Text>

      <View>
        <TextInput
          style={styles.input}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          placeholder="Type your address..."
        />
        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Pressable
                style={styles.suggestionItem}
                onPress={() => selectAddress(item)}
              >
                <Text>{item.display_name}</Text>
              </Pressable>
            )}
            style={styles.suggestionsContainer}
          />
        )}
      </View>

      <MapView style={styles.map} region={region}>
        <Marker coordinate={region} title="Your Address" />
      </MapView>

      <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>
        Shopping Cart
      </Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text>{item.name}</Text>
            <Text>{item.price.toLocaleString()} VND</Text>
          </View>
        )}
      />
      <Text style={styles.total}>Total: {total.toLocaleString()} VND</Text>

      <View style={styles.paymentContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>
          Choose Payment Method
        </Text>
        <Pressable
          style={[
            styles.paymentOption,
            paymentMethod === "COD" && styles.selectedPayment,
          ]}
          onPress={() => setPaymentMethod("COD")}
        >
          <Text>🛵 Cash on Delivery (COD)</Text>
        </Pressable>
        <Pressable
          style={[
            styles.paymentOption,
            paymentMethod === "E-Wallet" && styles.selectedPayment,
          ]}
          onPress={() => setPaymentMethod("E-Wallet")}
        >
          <Text>💳 E-Wallet / Payment Card</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => alert("Bill has been payed!")}
      >
        <Text style={styles.buttonText}>CONFIRM AND PAY</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    alignSelf: "center",
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  map: {
    width: Dimensions.get("window").width - 40,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  paymentContainer: {
    marginVertical: 10,
  },
  paymentOption: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedPayment: {
    backgroundColor: "lightblue",
    borderColor: "lightblue",
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  suggestionsContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    maxHeight: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "eee",
  },
});

export default PaymentScreen;
