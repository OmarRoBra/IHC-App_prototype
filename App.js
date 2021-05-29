import * as React from 'react';
import { Modal, Portal, Button, Provider } from 'react-native-paper';
import { SafeAreaView, View, Text, Image, TouchableOpacity, Keyboard, Alert, FlatList, StyleSheet, ScrollView,SectionList, StatusBar,TextInput } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';

const HamburgerIcon = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  }
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer} >
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Hamburger_icon_white.svg/1024px-Hamburger_icon_white.svg.png' }}
          style={{ width: 25, height: 25, marginLeft: 15 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const CustomSidebar = (props) => {
  const { state, descriptors, navigation } = props;
  let lastGroupName = '';
  let newGroup = true;

  return (
    <SafeAreaView style={{ flex: 1}}>
      <DrawerContentScrollView {...props}>
        {state.routes.map((route) => {
          const {
            drawerLabel,
            iconName,
            activeTintColor,
            groupName
          } = descriptors[route.key].options;
          if (lastGroupName !== groupName) {
            newGroup = true;
            lastGroupName = groupName;
          } else newGroup = false;
          return (
            <>
              {newGroup ? (
                <View style={styles.sectionView}>
                  <Text key={groupName} style={{ marginLeft: 10 }}>
                    {groupName}
                  </Text>
                  <View style={styles.separatorLine} />
                </View>
              ) : null}
              <DrawerItem
                style={{ alignItems: 'center' }}
                key={route.key}
                icon={
                  () => 
                  <Image style={{ width: 24, height: 24 }} source={ iconName } />
                }
                label={
                  ({ color }) =>
                    <Text style={{ color, textAlign: 'center' }}>
                      {drawerLabel}
                    </Text>
                }
                focused={
                  state.routes.findIndex(
                    (e) => e.name === route.name
                  ) === state.index
                }
                activeTintColor={activeTintColor}
                onPress={() => navigation.navigate(route.name)}
              />
            </>
          );
        })}
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const HomeScreen = () => {
  // Mover el modal a cuando la orden ya esté lista, lo puse provisional aquí 
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  // hasta aquí termina lo que necesita el modal

  return (
    <SafeAreaView flex={1}>
      <View style={styles.MainContainer}>
        <Image style={{ width: 150, height: 150 }} source={ require('./img/logo.png') } />
        <Text style={{ fontSize: 20, color: 'black', textAlign: 'center', marginTop: 15 }}>Bienvenido a la cafetería de servicios  universitarios</Text>
        <TouchableOpacity 
        style={{ height: 'auto', width: 100, backgroundColor: '#65ACF3', marginTop: 25, borderRadius: 45, justifyContent: 'center', padding: 15, 
        }} onPress={showModal}
        >
        <Text style={{ color:'white', textAlign: 'center' }}>Ordenar</Text>
        </TouchableOpacity>

        {/* Mover el modal a cuando la orden ya esté lista, lo puse provisional aquí  */}
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} style={{ padding: 50 }}>
          <Text style={{ fontSize: 18 }}>Su orden #18 está lista</Text>
          <Text style={{ marginTop: 25, fontSize: 16 }}>Por favor pase a la barra para poder recoger sus alimentos</Text>
          <Button style={{ marginTop: 25 }} onPress={hideModal}><Text style={{  color: 'black' }}>Ok</Text></Button>
        </Modal>

      </View>
    </SafeAreaView>
  );
};

const SecondScreen = ({ navigation }) => {
  const DATA = [];
  const data = [
    { key: 'Desayunos' },
    { key: 'Comidas' },
    { key: 'Bebidas' },
    { key: 'Postres' },
    
  ];
  
   const column1Data = data.filter((item, i) => i%2 === 0);
    const column2Data = data.filter((item, i) => i%2 === 1);
    const styles3 = StyleSheet.create({
      container: {
        flex: 2,
        flexDirection: 'row',
        height:'auto'
      },
      column: {
        flex: 1,
        flexDirection: 'column',
        margin:2
      },
      row: {
        flexDirection: 'row'
      },
      item: {
          backgroundColor: "#C4C4C4",
        padding: 20,
        marginVertical: 8,
        flex: 1,
        borderRadius:10
        
      },
      title: {
        fontSize: 32,
      },
    });
    return (
      <>
      <Text style={{ marginTop: 5, fontSize: 26,textAlign: 'center'  }}>Menú</Text>
      <View style={ styles3.container }>
  
        <View style={ styles3.column }>
          <FlatList
            data={ column1Data }
            renderItem={ ({ item }) => (
              <View  style={ styles3.item } >
                <Text onPress={() => navigation.navigate('menu')} style={{textAlign: 'center'  }}>{ item.key }</Text>
              </View>
            ) }
          />
        </View>
  
        <View style={ styles3.column }>
          <FlatList
            data={ column2Data }
            renderItem={ ({ item }) => (
              <View style={ styles3.item }>
                <Text style={{textAlign: 'center'  }}>{ item.key }</Text>
              </View>
            ) }
          />
        </View>
  
      </View>
      </>
    );
};

const ThirdScreen = () => {
  return (
    <SafeAreaView flex={1}>
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 25, color: 'black' }}>Third Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
    width: '100%',
    position: 'fixed',
    backgroundColor: 'white'
  },
  sectionView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  }
});


const menuScreen=()=>{
  const [visible, setVisible] = React.useState(false);
  const [number, onChangeNumber] = React.useState(0);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 10};

  const DATA = [
    {
      title: "Main dishes",
      data: ["Pizza", "Burger", "Risotto"]
    }
  ];
  const Item = ({ title }) => (
    <View style={stylesmenu.item}  >
     <Image
          
          style={stylesmenu.tinyLogo}
          source={{
            uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
          }}
        />
      <Text style={stylesmenu.title} onPress={showModal}>{title}</Text>
    </View>
  );
  return (
    <SafeAreaView style={stylesmenu.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item}  />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={stylesmenu.header}  >{title}</Text>
      )}
     
    />
     <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} style={{ padding: 10 }}>
          <Text style={{ fontSize: 18,textAlign: 'center',marginTop:20 }}>¿cuántas unidades de este  alimento desea ordenar?</Text>
          <TextInput
        style={stylesmenu.input}
        onChangeText={onChangeNumber}
        value={number}
      />
      <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
          <Button style={{backgroundColor:'red',margin: 15 }} onPress={hideModal}><Text style={{  color: 'black' }}>Ok</Text></Button>
          <Button style={{backgroundColor:'blue',margin: 15 }} onPress={hideModal}><Text style={{  color: 'black' }}>Ok</Text></Button>
          </div>
        </Modal>
  </SafeAreaView>
  );
} 
const stylesmenu = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    height:'auto',
paddingTop: StatusBar.currentHeight,
marginHorizontal: 16
},
item: {
flex: 2,
flexDirection: 'row',
backgroundColor: "#FFFFFF",
padding: 0,
marginVertical: 8,
textAlign: 'center',
borderRadius:10
},
header: {
fontSize: 22,

textAlign: 'center'
},
title: {
fontSize: 24,
textAlign: 'center'
},
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
   tinyLogo: {
    width: 100,
    height: 90,
    marginTop:0,
    marginRight:50,
    borderRadius:10
  },
  input: {
    height: 40,
    margin: 12,
    marginTop:30,
    marginBottom:20,
    borderWidth: 1,
    padding:10
  }
});
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Cafetería',
          headerLeft: () => (<HamburgerIcon navigationProps={navigation} />),
          headerStyle: {
            backgroundColor: '#F36565',
          },
          headerTintColor: '#fff',
        }}
      />
      
    </Stack.Navigator>
  );
}

function SecondStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <HamburgerIcon navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#F36565',
        },
        headerTintColor: '#fff',
      }}>

      <Stack.Screen
        name="SecondScreen"
        component={SecondScreen}
        options={{
          title: 'Ordenar',
        }}
      />

    </Stack.Navigator>
  );
}

function ThirdStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <HamburgerIcon navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#F36565',
        },
        headerTintColor: '#fff',
      }}>

      <Stack.Screen
        name="ThirdScreen"
        component={ThirdScreen}
        options={{
          title: 'Recientes',
        }}
      />

    </Stack.Navigator>
  );
}


function fourthStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <HamburgerIcon navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#F36565',
        },
        headerTintColor: '#fff',
      }}>

      <Stack.Screen
        name="FourthScreen"
        component={menuScreen}
        options={{
          title: 'Menú',
        }}
      />

    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomSidebar {...props} />}>
        
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: 'Menú',
            activeTintColor: '#F36565',
            iconName: require("./img/menu.png")
          }}
          component={HomeStack}
        />

        <Drawer.Screen
          name="Second"
          options={{
            drawerLabel: 'Ordenar',
            activeTintColor: '#F36565',
            iconName: require("./img/ordenar.png")
          }}
          component={SecondStack}
        />

        <Drawer.Screen
          name="Third"
          options={{
            drawerLabel: 'Recientes',
            activeTintColor: '#F36565',
            iconName: require("./img/recientes.png")
          }}
          component={ThirdStack}
        />
        <Drawer.Screen
           name="menu"
           
           component={fourthStack}
        />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}