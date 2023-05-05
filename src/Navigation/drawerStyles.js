import { StyleSheet } from "react-native";

const drawerStyles = StyleSheet.create({
    header: {
        backgroundColor: '#2B3B50',
        height: 100,
        alignItems: 'center',
      },
      image: {
        flexDirection: 'row', justifyContent: 'flex-end', padding: 10 
      },
      avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
      },
      userInfo: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      username: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#FFF',
      },
      email: {
        fontSize: 14,
        color: '#FFF',
      },
      label: {
        fontSize: 16,
        marginLeft: -16,
      },
      drawerItems: {
        marginLeft: 0,
        padding: 0,
    
      }
});

export default drawerStyles;