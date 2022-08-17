import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./src/pages/Home";
import Signin from "./src/pages/Signin";
import Login from "./src/pages/Login";
import Loading from "./src/pages/Loading";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase/firebase.config";
import {useEffect, useState} from "react";
import Chat from "./src/pages/Chat";

const Stack = createNativeStackNavigator();

export default function App() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});
	}, []);
	return (
		<NavigationContainer>
			{loading ? (
				<Stack.Navigator screenOptions={{headerShown: false}}>
					<Stack.Screen name="loading" component={Loading} />
				</Stack.Navigator>
			) : user ? (
				<Stack.Navigator screenOptions={{headerShown: false}}>
					<Stack.Screen name="home" component={Home} />
					<Stack.Screen name="chat" component={Chat} />
				</Stack.Navigator>
			) : (
				<Stack.Navigator screenOptions={{headerShown: false}}>
					<Stack.Screen name="signin" component={Signin} />
					<Stack.Screen name="login" component={Login} />
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
}
