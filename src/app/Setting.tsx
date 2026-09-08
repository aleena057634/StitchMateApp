// import { Ionicons } from "@expo/vector-icons";
// import { Pressable, StyleSheet, Text, View } from "react-native";
// import colors from "@/constents/colors";

// export default function Stting() {



//   return (
//     <View
//       style={[
//         styles.container,
//         { backgroundColor: colors.background },
//       ]}
//     >

//       {/* Screen title */}
//       <Text
//         style={[
//           styles.title,
//           { color: colors.text },
//         ]}
//       >
//         Settings
//       </Text>


//       {/* Appearance section */}
//       <Text
//         style={[
//           styles.sectionTitle,
//           { color: colors.secondaryText },
//         ]}
//       >
//         Appearance
//       </Text>


//       {/* Theme card */}
//       <View
//         style={[
//           styles.card,
//           { backgroundColor: colors.card },
//         ]}
//       >

//         <View style={styles.row}>

//           {/* Theme icon */}
//           <View
//             style={[
//               styles.iconBox,
//               { backgroundColor: "#EAF7EF" },
//             ]}
//           >
//             <Ionicons
//               name="color-palette-outline"
//               size={22}
//               color={colors.primary}
//             />
//           </View>


//           {/* Theme heading */}
//           <View>
//             <Text
//               style={[
//                 styles.cardTitle,
//                 { color: colors.text },
//               ]}
//             >
//               Theme
//             </Text>

//             <Text
//               style={[
//                 styles.cardSubtitle,
//                 { color: colors.secondaryText },
//               ]}
//             >
//               Choose your app theme
//             </Text>
//           </View>

//         </View>


//         {/* Light / Dark options */}
//         <View style={styles.themeOptions}>

//           {/* Light Theme Button */}
//           <Pressable
//             style={[
//               styles.themeOption,
//               {
//                 borderColor:
//                   theme === "light"
//                     ? colors.primary
//                     : colors.border,

//                 backgroundColor:
//                   theme === "light"
//                     ? "#EAF7EF"
//                     : colors.card,
//               },
//             ]}
//             onPress={() => changeTheme("light")}
//           >

//             <Ionicons
//               name="sunny-outline"
//               size={20}
//               color={
//                 theme === "light"
//                   ? colors.primary
//                   : colors.secondaryText
//               }
//             />

//             <Text
//               style={[
//                 styles.themeText,
//                 { color: colors.text },
//               ]}
//             >
//               Light
//             </Text>

//           </Pressable>


//           {/* Dark Theme Button */}
//           <Pressable
//             style={[
//               styles.themeOption,
//               {
//                 borderColor:
//                   theme === "dark"
//                     ? colors.primary
//                     : colors.border,

//                 backgroundColor:
//                   theme === "dark"
//                     ? "#263238"
//                     : colors.card,
//               },
//             ]}
//             onPress={() => changeTheme("dark")}
//           >

//             <Ionicons
//               name="moon-outline"
//               size={20}
//               color={
//                 theme === "dark"
//                   ? colors.primary
//                   : colors.secondaryText
//               }
//             />

//             <Text
//               style={[
//                 styles.themeText,
//                 { color: colors.text },
//               ]}
//             >
//               Dark
//             </Text>

//           </Pressable>

//         </View>

//       </View>

//     </View>
//   );
// }


// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     padding: 20,
//   },


//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     marginBottom: 25,
//   },


//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 10,
//   },


//   card: {
//     borderRadius: 15,
//     padding: 18,
//   },


//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//   },


//   iconBox: {
//     width: 45,
//     height: 45,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },


//   cardTitle: {
//     fontSize: 17,
//     fontWeight: "600",
//   },


//   cardSubtitle: {
//     fontSize: 13,
//     marginTop: 3,
//   },


//   themeOptions: {
//     flexDirection: "row",
//     marginTop: 20,
//     gap: 10,
//   },


//   themeOption: {
//     flex: 1,
//     height: 50,
//     borderWidth: 1,
//     borderRadius: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//   },


//   themeText: {
//     fontSize: 14,
//     fontWeight: "600",
//   },

// });

import { View, Text } from 'react-native'
import React from 'react'

export default function Setting() {
  return (
    <View>
      <Text>Setting</Text>
    </View>
  )
}